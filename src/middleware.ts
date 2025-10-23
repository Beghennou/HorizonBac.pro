
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_COOKIE_NAME = 'teacher-auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si la requête concerne une route du tableau de bord de l'enseignant
  if (pathname.startsWith('/teacher/dashboard')) {
    const isAuthenticated = request.cookies.has(AUTH_COOKIE_NAME);

    // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    if (!isAuthenticated) {
      const loginUrl = new URL('/teacher/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si l'utilisateur est sur la page de connexion et est déjà authentifié,
  // on peut optionnellement le rediriger vers le tableau de bord
  if (pathname.startsWith('/teacher/login')) {
      const isAuthenticated = request.cookies.has(AUTH_COOKIE_NAME);
      if (isAuthenticated) {
          const dashboardUrl = new URL('/teacher/dashboard/students', request.url);
          return NextResponse.redirect(dashboardUrl);
      }
  }


  // Continue la requête normalement pour toutes les autres routes
  return NextResponse.next();
}

// Spécifiez les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: ['/teacher/dashboard/:path*', '/teacher/login'],
}
