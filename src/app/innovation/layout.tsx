import Nav from "@/components/nav/resnav";
import Footer from "@/components/section/uplift/footer";

export default function InnovationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
