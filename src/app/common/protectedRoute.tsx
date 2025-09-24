"use client";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedUserTypes?: ("admin" | "employee")[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedUserTypes = ["admin", "employee"],
  redirectTo,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const originalPath = encodeURIComponent(window.location.pathname);
      toast.error("Users not Authenticated, Please Login");
      router.push(`/login?redirect=${originalPath}`);
    }
  }, [isLoading, isAuthenticated, router]);

  // Handle authorization and redirects without causing side-effects during render
  useEffect(() => {
    if (isLoading || !isAuthenticated || !user) return;

    const isPayrollStaff = user.is_payroll_staff;
    const userType = isPayrollStaff ? "admin" : "employee";
    const isAllowed = allowedUserTypes.includes(userType);

    if (!isAllowed) {
      toast.error(
        "Access denied. You don't have permission to access this page."
      );
      router.push(redirectTo || (isPayrollStaff ? "/admin" : "/employee"));
      return;
    }

    if (pathname.startsWith("/admin") && !isPayrollStaff) {
      toast.error("Access denied. Admin access required.");
      router.push("/employee");
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    pathname,
    router,
    allowedUserTypes,
    redirectTo,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg font-medium text-gray-600 mb-4">
          Authenticating...
        </p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E37915]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Optionally hide content until authorization confirmed
  if (user) {
    const isPayrollStaff = user.is_payroll_staff;
    const userType = isPayrollStaff ? "admin" : "employee";
    const isAllowed = allowedUserTypes.includes(userType);
    if (!isAllowed) return null;
    if (pathname.startsWith("/admin") && !isPayrollStaff) return null;
  }

  return <>{children}</>;
}
