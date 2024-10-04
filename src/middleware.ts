import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["th", "en"];

function getLocale() {
  const headers = { "accept-language": "th;q=0.5" };
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = "th";

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("pathname", request.nextUrl.pathname);
  if (pathnameHasLocale) return NextResponse.next({ request: { headers: requestHeaders } });

  const locale = getLocale();
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
