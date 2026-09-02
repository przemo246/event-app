import { CalendarDays, MapPin, PartyPopper } from "lucide-react";
import Image from "next/image";

type EventCardProps = {
  title: string;
  dateLabel: string;
  location: string;
  categoryLabel: string;
  imageUrl: string | null;
};

export const EventCard = ({
  title,
  dateLabel,
  location,
  categoryLabel,
  imageUrl,
}: EventCardProps) => {
  return (
    <article className="cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      {imageUrl ? (
        <div className="relative aspect-4/3 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-4/3 items-center justify-center bg-linear-to-br from-primary/10 to-accent/20">
          <PartyPopper className="size-10 text-primary/40" />
        </div>
      )}
      <div className="p-4">
        <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
          {categoryLabel}
        </span>
        <h3 className="mt-2 line-clamp-2 text-base font-semibold text-card-foreground">
          {title}
        </h3>
        <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="size-4 shrink-0" />
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
