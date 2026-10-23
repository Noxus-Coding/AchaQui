import { Header } from "../features/landing/components/Header";
import { HeroSection } from "../features/landing/sections/HeroSection";
import { CategoriesSection } from "../features/landing/sections/CategoriesSection";

import {
  HowItWorksSection,
  ProfessionalsSection,
  RegionalSection,
  ProfessionalsCTA,
  FAQSection,
  Footer,
} from "../features/landing/sections/LandingExtras";

export function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <ProfessionalsSection />
      <RegionalSection />
      <ProfessionalsCTA />
      <FAQSection />
      <Footer />
    </>
  );
}