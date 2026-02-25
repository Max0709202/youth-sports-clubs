import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Youth Merch Studio",
  description: "Push-button merch stores for youth sports teams."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans text-slate-50">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
