import Link from "next/link";
import { Briefcase, Dumbbell, Music2, Palette, UtensilsCrossed, Users } from "lucide-react";
import { CATEGORY_OPTIONS, SEARCH_RESULTS_PATH } from "../configuration/constraints";

const CATEGORY_ICONS: Record<string, typeof Music2> = {
  music_entertainment: Music2,
  business_professional: Briefcase,
  food_drink: UtensilsCrossed,
  sports_wellness: Dumbbell,
  arts_culture: Palette,
  community_hobbies: Users,
};

export const CategoriesSection = () => {
  return (
    <section id="kategorie" className="bg-muted px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold text-foreground">Kategorie wydarzeń</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORY_OPTIONS.map((option) => {
            const Icon = CATEGORY_ICONS[option.value];
            return (
              <Link
                key={option.value}
                href={`${SEARCH_RESULTS_PATH}?category=${option.value}`}
                className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card px-4 py-6 text-center hover:border-primary/40"
              >
                <Icon className="size-7 text-primary" />
                <span className="text-sm font-medium text-card-foreground">{option.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
