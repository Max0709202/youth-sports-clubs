"use server";

import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { tenants, tenantThemes, tenantSettings } from "@/lib/db/schema";

function slugFromName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "team";
}

export async function createTeamAndSignUp(
  _prev: { error?: string } | null,
  formData: FormData
) {
  const teamName = formData.get("teamName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!teamName?.trim() || !email?.trim() || !password) {
    return { error: "Please fill in all fields." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const slug = slugFromName(teamName);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: "Server configuration error. Please try again later." };
  }

  if (!db) {
    return { error: "Database not configured. Please try again later." };
  }

  try {
    const [tenant] = await db
      .insert(tenants)
      .values({
        slug: slug,
        name: teamName.trim(),
        status: "active",
      })
      .returning({ id: tenants.id, slug: tenants.slug });

    if (!tenant) {
      return { error: "Failed to create team. Please try again." };
    }

    await db.insert(tenantThemes).values({
      tenantId: tenant.id,
    });
    await db.insert(tenantSettings).values({
      tenantId: tenant.id,
    });

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { tenant_id: tenant.id, tenant_slug: tenant.slug },
      },
    });

    if (signUpError) {
      await db.delete(tenants).where(eq(tenants.id, tenant.id));
      return { error: signUpError.message || "Sign up failed. Please try again." };
    }

    redirect("/onboarding/logo?tenant=" + tenant.slug);
  } catch (e) {
    if (e && typeof (e as { digest?: string }).digest === "string" && (e as { digest: string }).digest === "NEXT_REDIRECT") {
      throw e;
    }
    console.error("Onboarding error:", e);
    return { error: "Something went wrong. Please try again." };
  }
}
