import { SplashCursor } from "@/components/SplashCursor";
import BannerSection from "@/sections/BannerSection";
import FaqSection from "@/sections/FAQSection";
import MainHeroSection from "@/sections/MainHeroSection";
import SecondHeroSection from "@/sections/SecondHeroSection";

export default function HomePage() {
  return (
    <section className="flex w-full flex-col gap-10 lg:gap-5">
      <SplashCursor />
      {/*  Hero section */}
      <MainHeroSection />

      <SecondHeroSection />
      {/*  FAQ section */}
      <FaqSection />
      {/*    Banner section */}
      <BannerSection />
    </section>
  );
}
