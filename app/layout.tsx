import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Neon Burger | Future of Taste",
  description: "Ultra-modern burger joint demo app created with Next.js, Framer Motion and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased min-h-screen selection:bg-neon-green selection:text-black">
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
