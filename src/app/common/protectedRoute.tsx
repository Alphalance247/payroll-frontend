"use client";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const originalPath = encodeURIComponent(window.location.pathname);
      toast.error("Users not Authenticated, Please Login");
      router.push(`/login?redirect=${originalPath}`);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E37915]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
