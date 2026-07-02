import { lazy, Suspense } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Results from "../components/Results";
import CTA from "../components/CTA";

const Process = lazy(() => import("../components/Process"));
const Work = lazy(() => import("../components/Work"));
const Contact = lazy(() => import("../components/Contact"));

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Suspense fallback={<div className="h-96 bg-background" />}>
        <Process />
      </Suspense>
      <Results />
      <Suspense fallback={<div className="h-96 bg-background" />}>
        <Work />
      </Suspense>
      <CTA />
      <Suspense fallback={<div className="h-96 bg-background" />}>
        <Contact />
      </Suspense>
    </main>
  );
}
