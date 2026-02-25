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

  let tenant: { id: string; slug: string } | null = null;

  try {
    // if (db) {
    //   try {
    //     const [row] = await db
    //       .insert(tenants)
    //       .values({
    //         slug,
    //         name: teamName.trim(),
    //         status: "active",
    //       })
    //       .returning({ id: tenants.id, slug: tenants.slug });

    //     if (row) {
    //       tenant = row;
    //       await db.insert(tenantThemes).values({ tenantId: tenant.id });
    //       await db.insert(tenantSettings).values({ tenantId: tenant.id });
    //     }
    // await db.insert(tenantThemes).values({
    //   tenantId: tenant.id,
    // });
    // await db.insert(tenantSettings).values({
    //   tenantId: tenant.id,
    // });

    //   } catch (dbError) {
    //     console.warn("Database unavailable, continuing with auth only:", dbError);
    //   }
    // }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      // options: {
      //   data: tenant
      //     ? { tenant_id: String(tenant.id), tenant_slug: String(tenant.slug) }
      //     : { team_name: teamName.trim(), team_slug: slug },
      // },
    });

    if (signUpError) {
      if (tenant && db) {
        try {
          await db.delete(tenants).where(eq(tenants.id, tenant.id));
        } catch (_) {}
      }
      return { error: signUpError.message || "Sign up failed. Please try again." };
    }

    redirect(tenant ? "/onboarding/logo?tenant=" + tenant.slug : "/onboarding/logo?pending=1");
  } catch (e) {
    if (e && typeof (e as { digest?: string }).digest === "string" && (e as { digest: string }).digest === "NEXT_REDIRECT") {
      throw e;
    }
    console.error("Onboarding error:", e);
    const message = e instanceof Error ? e.message : "Something went wrong. Please try again.";
    const isDuplicateSlug =
      /unique|duplicate key|already exists/i.test(message);
    const userMessage =
      process.env.NODE_ENV === "production"
        ? isDuplicateSlug
          ? "A team with this name already exists. Try a different name."
          : "Something went wrong. Please try again."
        : message;
    return { error: userMessage };
  }
}
