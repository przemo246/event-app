"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/libs/react-kit/cn";

const SHADOW_PATHS = ["/login", "/register", "/account/profile", "/events/new"];

type NavBarHeaderProps = {
  children: React.ReactNode;
};

export const NavBarHeader = ({ children }: NavBarHeaderProps) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "bg-background",
        SHADOW_PATHS.includes(pathname) && "shadow-md",
      )}
    >
      {children}
    </header>
  );
};
