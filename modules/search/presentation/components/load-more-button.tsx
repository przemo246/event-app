"use client";

import { Button } from "@/libs/ui/button";
import { useContext } from "../context";

export const LoadMoreButton = () => {
  const ctx = useContext();
  const hasMore = ctx.useHasMore();
  const status = ctx.useStatus();

  if (!hasMore) return null;

  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        onPress={ctx.loadMore}
        isDisabled={status === "loading-more"}
      >
        {status === "loading-more" ? "Wczytywanie..." : "Wczytaj więcej"}
      </Button>
    </div>
  );
};
