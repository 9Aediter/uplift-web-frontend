"use client";

import Nav from "@/components/nav/resnav";
import Hero from "@/components/section/uplift/hero/heroai";
import Problems from "@/components/section/uplift/problem";
import Show from "@/components/section/uplift/show";
import Service from "@/components/section/uplift/service";
import Vision from "@/components/section/uplift/vision";
import Testimonials from "@/components/section/uplift/testimonials";
import Footer from "@/components/section/uplift/footer";
import { Product } from "@/components/section/uplift/product"

import { useRef } from "react";
import { useAutoScroll } from "@/lib/autoscroll";


export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const showRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [
    heroRef,
    problemsRef,
    serviceRef,
    showRef,
    visionRef
  ];

  useAutoScroll(sectionRefs);

  return (
    <>
    <Nav/>
      <main className="w-full inset-0 ">
        <Hero ref={heroRef} />
        <Product/>
        <Problems ref={problemsRef} />
        <Service ref={serviceRef} />
        <Show ref={showRef} />
        <Vision ref={visionRef} />
        <Testimonials />
      </main>
      <Footer/>
    </>
  );
}
