import { CategoriesSection } from "./categories-section";
import { HeroSection } from "./hero-section";
import { PopularCitiesSection } from "./popular-cities-section";
import { PromotedEventsSection } from "./promoted-events-section";

export const Main = () => {
  return (
    <>
      <HeroSection />
      <PromotedEventsSection />
      <CategoriesSection />
      <PopularCitiesSection />
    </>
  );
};
