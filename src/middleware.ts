import { NextRequest, NextResponse } from "next/server";
import { getTenantByHost } from "@/lib/tenant/resolver";

export async function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const tenant = await getTenantByHost(host);

  const requestHeaders = new Headers(req.headers);
  if (tenant) {
    requestHeaders.set("x-tenant-id", tenant.id);
    requestHeaders.set("x-tenant-slug", tenant.slug);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
