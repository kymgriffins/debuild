import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip proxy check. You can remove this
  // once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Protected routes that require authentication
  const protectedRoutes = ['/admin', '/client', '/protected'];

  if (user) {
    // User is authenticated - handle role-based routing
    const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

    if (isProtectedRoute) {
      // Get user profile to determine role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.sub)
        .single();

      const userRole = profile?.role;

      // Handle specific protected routes
      if (request.nextUrl.pathname === '/protected') {
        // Redirect to appropriate dashboard based on role
        const url = request.nextUrl.clone();
        if (userRole === 'admin') {
          url.pathname = "/admin";
        } else {
          url.pathname = "/client";
        }
        return NextResponse.redirect(url);
      }

      // Additional role-based access control
      if (request.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }

      if (request.nextUrl.pathname.startsWith('/client') && userRole !== 'client' && userRole !== 'admin') {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }
  } else {
    // User is not authenticated
    const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

    if (isProtectedRoute) {
      // Redirect to login if accessing protected route without authentication
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
