"use client";

import { usePathname } from "next/navigation";

type NavBarHeaderProps = {
  children: React.ReactNode;
};

export const NavBarHeader = ({ children }: NavBarHeaderProps) => {
  const pathname = usePathname();

  return <header className="bg-background shadow-md">{children}</header>;
};
