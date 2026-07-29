"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/react-kit/cn";

export type AuthTab = "login" | "register";

const TABS: { value: AuthTab; label: string; href: string }[] = [
  { value: "login", label: "Zaloguj się", href: "/login" },
  { value: "register", label: "Zarejestruj się", href: "/register" },
];

export const AuthModeTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex border-b border-border">
      {TABS.map((tab) => (
        <Link
          key={tab.value}
          href={tab.href}
          className={cn(
            "flex-1 border-b-2 pb-3 text-center text-sm font-semibold",
            pathname === tab.href
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};
