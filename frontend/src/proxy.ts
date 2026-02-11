import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ['en', 'fr'];
let defaultLocale = 'en';

function getLocale(request: NextRequest) {
  // Check cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
      return cookieLocale;
  }

  // Check accept-language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
      // Very basic parsing
      if (acceptLanguage.includes('fr')) return 'fr';
  }
  
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|favicon.ico|api|.*\\..*).*)',
  ],
};
