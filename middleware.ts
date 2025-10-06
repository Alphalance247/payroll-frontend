import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get user data from cookies or headers (you might need to adjust this based on your auth setup)
  const userCookie = request.cookies.get("user");
  let user = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }

  // Define protected routes
  const adminRoutes = ["/admin"];
  const employeeRoutes = ["/employee"];
  const publicRoutes = ["/login", "/"];

  // Check if the current path is an admin route
  const isAdminRoute = adminRoutes?.some((route) => pathname.startsWith(route));
  const isEmployeeRoute = employeeRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(pathname);

  // If user is not authenticated and trying to access protected routes
  if (!user && (isAdminRoute || isEmployeeRoute)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated, check user type and route access
  if (user) {
    const isPayrollStaff = user.is_payroll_staff;

    // If employee tries to access admin routes, redirect to employee dashboard
    if (!isPayrollStaff && isAdminRoute) {
      return NextResponse.redirect(new URL("/employee", request.url));
    }

    // If admin tries to access employee routes, allow it (admin can access both)
    // But if they're on the root employee route, redirect to admin dashboard
    if (isPayrollStaff && pathname === "/employee") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // If authenticated user tries to access login, redirect to appropriate dashboard
    if (pathname === "/login") {
      const redirectUrl = isPayrollStaff ? "/admin" : "/employee";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
