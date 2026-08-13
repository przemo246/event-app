"use client";

import { HeartIcon } from "lucide-react";

import { ButtonLink } from "@/libs/ui/button";
import { Tooltip } from "@/libs/ui/tooltip";

export const FavoriteEventsLink = () => {
  return (
    <Tooltip.Root delay={0} closeDelay={0}>
      <Tooltip.Trigger>
        <ButtonLink
          variant="ghost"
          className="size-10 p-0"
          aria-label="Ulubione wydarzenia"
          href="/favorites"
        >
          <HeartIcon className="size-5" />
        </ButtonLink>
      </Tooltip.Trigger>
      <Tooltip.Content>Ulubione</Tooltip.Content>
    </Tooltip.Root>
  );
};
