"use client";

import { useAuth } from "../context/authContext";

export default function TokenExpiredMessage() {
  const { isTokenExpired } = useAuth();

  if (!isTokenExpired) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E37915]"></div>
        </div>
        <h2 className="text-xl font-semibold text-center text-[#2F2F33] mb-2">
          Session Expired
        </h2>
        <p className="text-center text-[#71717A]">
          Your session has expired. You will be logged out automatically.
        </p>
      </div>
    </div>
  );
}
