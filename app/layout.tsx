import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fire Burger | Premium Fast-Food",
  description: "Prawdziwe rzemieślnicze burgery i chrupiąca pizza. Zamów online na wynos z obierem osobistym.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
        <Navigation />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <Toaster theme="light" position="bottom-right" />
    </html>
  );
}
