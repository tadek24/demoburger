import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Max Burger | Premium Fast-Food",
  description: "Prawdziwe rzemieślnicze burgery i chrupiąca pizza. Zamów online z dostawą.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="antialiased min-h-screen selection:bg-brand-red selection:text-white pt-20 flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <Toaster theme="light" position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
