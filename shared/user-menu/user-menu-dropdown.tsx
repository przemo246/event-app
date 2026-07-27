"use client";

import type { Key } from "react-aria-components";
import { ChevronDown, LogOut, User } from "lucide-react";

import { DropdownMenu } from "@/libs/ui/dropdown-menu";
import { createClient } from "@/libs/supabase/client";

export const UserMenuDropdown = () => {
  const handleAction = async (key: Key) => {
    if (key !== "sign-out") return;

    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.assign("/");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger variant="ghost" className="h-10 gap-1.5 text-sm px-3">
        <User className="size-5" />
        Moje konto
        <ChevronDown className="size-4" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content onAction={handleAction}>
        <DropdownMenu.Item id="profile" href="/account/profile">
          <User className="size-4" />
          Profil
        </DropdownMenu.Item>
        <DropdownMenu.Item id="sign-out">
          <LogOut className="size-4" />
          Wyloguj się
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
