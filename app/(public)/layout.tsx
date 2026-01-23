import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Toaster as SonnerToaster } from "sonner";
import "../globals.css";

const raleway = Raleway({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Explore Otherside",
  description: "Find your next travel destination with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${raleway.className} min-h-screen flex flex-col leading-relaxed tracking-wide `}
        suppressHydrationWarning
      >
        <Header />
        <div className="flex-1 container mx-auto md:max-w-6xl">
          {children}
        </div>
        <Footer />
        <Toaster />
        <SonnerToaster richColors position="top-center" />
      </body>
    </html>
  );
}
