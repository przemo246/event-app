"use client";

type NavBarHeaderProps = {
  children: React.ReactNode;
};

export const NavBarHeader = ({ children }: NavBarHeaderProps) => {
  return <header className="bg-background shadow-md">{children}</header>;
};
