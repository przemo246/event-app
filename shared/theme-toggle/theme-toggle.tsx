"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DropdownMenu } from "@/libs/ui/dropdown-menu";

const THEME_OPTIONS = [
  { value: "light", label: "Jasny", icon: Sun },
  { value: "dark", label: "Ciemny", icon: Moon },
  { value: "system", label: "Systemowy", icon: Monitor },
] as const;

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeOption =
    THEME_OPTIONS.find((option) => option.value === theme) ?? THEME_OPTIONS[2];
  const ActiveIcon = activeOption.icon;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label="Zmień motyw"
        variant="ghost"
        className="size-10 p-0"
      >
        {mounted ? (
          <ActiveIcon className="size-5" />
        ) : (
          <span className="size-5" />
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="w-40"
        selectedKeys={mounted && theme ? [theme] : []}
        selectionMode="single"
        onSelectionChange={(keys) => {
          if (keys === "all") return;
          const [key] = keys;
          if (typeof key === "string") setTheme(key);
        }}
      >
        {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
          <DropdownMenu.Item key={value} id={value}>
            <Icon className="size-4" />
            {label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
