"use client";

import { useState } from "react";
import { Button } from "@/libs/ui/button";
import { useContext } from "./context";

export const DeleteAccountSection = () => {
  const ctx = useContext();

  const [isConfirming, setIsConfirming] = useState(false);
  const isDeleting = ctx.useIsDeletingAccount();
  const error = ctx.useDeleteError();

  if (!isConfirming) {
    return (
      <Button
        variant="outline"
        className="w-fit border-destructive text-destructive hover:bg-destructive/10"
        onPress={() => setIsConfirming(true)}
      >
        Usuń konto
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-md border border-destructive/50 p-4">
      <p className="text-sm text-foreground">
        Tej operacji nie można cofnąć. Czy na pewno chcesz usunąć swoje konto?
      </p>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex gap-3">
        <Button
          className="bg-destructive text-destructive-foreground hover:opacity-90"
          isDisabled={isDeleting}
          onPress={() => ctx.deleteAccount()}
        >
          Tak, usuń konto
        </Button>
        <Button
          variant="ghost"
          isDisabled={isDeleting}
          onPress={() => setIsConfirming(false)}
        >
          Anuluj
        </Button>
      </div>
    </div>
  );
};
