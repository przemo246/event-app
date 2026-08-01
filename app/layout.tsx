import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { LocaleProvider } from "@/shared/locale-provider/locale-provider";
import { NavBar } from "@/shared/nav-bar/nav-bar";
import { SiteFooter } from "@/shared/site-footer/site-footer";
import { ThemeProvider } from "@/shared/theme-provider/theme-provider";
import "../core/style/index.css";

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "afisz — znajdź wydarzenia w całej Polsce",
  description:
    "Koncerty, festiwale, teatr i sport. Wyszukiwarka wydarzeń w Polsce.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="pl" className={sora.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <LocaleProvider>
            <NavBar />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
