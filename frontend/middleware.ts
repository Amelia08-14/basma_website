import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/auth';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes — auth guard, skip i18n entirely
  if (pathname.startsWith('/admin')) {
    if (!pathname.startsWith('/admin/login')) {
      const token = request.cookies.get('admin-token')?.value;
      if (!token || !(await verifySessionToken(token))) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    return NextResponse.next();
  }

  // i18n: redirect / and any path without locale prefix → /{locale}{path}
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (!hasLocale) {
    const acceptLang = request.headers.get('accept-language') ?? '';
    const preferred = acceptLang.toLowerCase().includes('fr') ? 'fr' : defaultLocale;
    return NextResponse.redirect(new URL(`/${preferred}${pathname === '/' ? '' : pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
