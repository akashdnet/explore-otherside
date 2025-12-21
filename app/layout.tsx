import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Travel Buddy",
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
        className={`${raleway.className} min-h-screen flex flex-col container mx-auto  `}
        suppressHydrationWarning
      >
        <Header />
        <div className="flex-1 container mx-auto md:max-w-6xl space-y-32  ">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
