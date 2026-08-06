import type { Metadata } from "next";
import "./globals.css";
import Notification from "./common/notification";
import { AuthProvider } from "./context/authContext";
import SessionConflictMessage from "./common/sessionConflictMessage";
import TokenExpiredMessage from "./components/TokenExpiredMessage";
import QueryProviders from "./context/queryContext";

export const metadata: Metadata = {
  title: "Alluvium Payroll App",
  description:
    "A payroll management application for efficient employee compensation handling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-Graphik`}>
        <AuthProvider>
          <Notification />
          <TokenExpiredMessage />
          <SessionConflictMessage />
          <QueryProviders>{children}</QueryProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
