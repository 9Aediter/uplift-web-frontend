import Nav from "@/components/nav/resnav";
import Footer from "@/components/footer/footer";

export default function InnovationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
