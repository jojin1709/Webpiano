import { LandingHeader } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Preview } from "@/components/landing/preview";
import { Stats } from "@/components/landing/stats";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory-50 dark:bg-stage-950">
      <LandingHeader />
      <Hero />
      <Features />
      <HowItWorks />
      <div id="songs">
        <Preview />
      </div>
      <Stats />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
