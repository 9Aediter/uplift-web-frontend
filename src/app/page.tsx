import Nav from "@/components/nav/resnav";
import { Hero } from "@/components/section/uplift/hero/heroai";
import Problems from "@/components/section/uplift/problem";
import Show from "@/components/section/uplift/show";
import Service from "@/components/section/uplift/service";
import Vision from "@/components/section/uplift/vision";
// import Testimonials from "@/components/section/uplift/testimonials";
import Footer from "@/components/footer/footer";
import { Product } from "@/components/section/uplift/product"
import { ProblemSectionSkeleton } from "@/components/skeleton/uplift/problem-section";
import { HeroSectionSkeleton } from "@/components/skeleton/uplift/hero-section";
import { ProductSectionSkeleton } from "@/components/skeleton/uplift/product-section";
import { Suspense } from "react";

export default function Home() {

  return (
    <>
      <Nav />
      <main className="w-full inset-0 ">
        <Suspense fallback={<HeroSectionSkeleton />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<ProblemSectionSkeleton />}>
          <Problems />
        </Suspense>
        <Suspense fallback={<ProductSectionSkeleton />}>
          <Product />
        </Suspense>
        <Suspense fallback={<ProblemSectionSkeleton />}>
        <Service />
        </Suspense>
        <Show />
        <Vision />

      </main>
      <Footer />
    </>
  );
}
