import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";

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
    <html lang="pl" suppressHydrationWarning>
      <body className="antialiased min-h-screen selection:bg-neon-green selection:text-black pt-16">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          {children}
          <Toaster theme="dark" position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
