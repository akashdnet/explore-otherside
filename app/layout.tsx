import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>

        {/* <Header /> */}
        {children}
        <Toaster />
        {/* <Footer /> */}

      </body>
    </html>
  );
}
