"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components";
import { Button } from "@/libs/ui/button";

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
    <MenuTrigger>
      <Button aria-label="Zmień motyw" variant="ghost" className="size-10 p-0">
        {mounted ? (
          <ActiveIcon className="size-5" />
        ) : (
          <span className="size-5" />
        )}
      </Button>
      <Popover className="w-40 rounded-md border border-border bg-card shadow-md">
        <Menu
          className="p-1 outline-none"
          selectedKeys={mounted && theme ? [theme] : []}
          selectionMode="single"
          onSelectionChange={(keys) => {
            if (keys === "all") return;
            const [key] = keys;
            if (typeof key === "string") setTheme(key);
          }}
        >
          {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
            <MenuItem
              key={value}
              id={value}
              className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm font-normal text-card-foreground data-focused:bg-accent data-focused:text-accent-foreground"
            >
              <Icon className="size-4" />
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};
