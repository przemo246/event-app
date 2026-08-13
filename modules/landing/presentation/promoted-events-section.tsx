import { EventCard } from "@/shared/event-card/presentation/event-card";
import { CATEGORY_OPTIONS } from "../configuration/constraints";
import { MOCK_PROMOTED_EVENTS } from "../configuration/mock-promoted-events";

const categoryLabel = (category: string) =>
  CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? category;

export const PromotedEventsSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold text-foreground">Promowane wydarzenia</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_PROMOTED_EVENTS.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            dateLabel={event.dateLabel}
            location={event.location}
            categoryLabel={categoryLabel(event.category)}
          />
        ))}
      </div>
    </section>
  );
};
