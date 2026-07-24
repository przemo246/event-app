import Link from "next/link";
import { MapPin } from "lucide-react";
import { SEARCH_RESULTS_PATH } from "../configuration/constraints";

const POPULAR_CITIES = ["Warszawa", "Kraków", "Wrocław", "Poznań", "Gdańsk", "Łódź"];

export const PopularCitiesSection = () => {
  return (
    <section id="miasta" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold text-foreground">Popularne miasta</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {POPULAR_CITIES.map((city) => (
          <Link
            key={city}
            href={`${SEARCH_RESULTS_PATH}?location=${encodeURIComponent(city)}`}
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-6 text-center hover:border-primary/40"
          >
            <MapPin className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">{city}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
