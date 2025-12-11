import Footer from "./_home/Footer";
import Header from "./_home/Header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="antialiased flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 my-12">
        {children}
      </div>
      <Footer />
    </div>
  );
}
