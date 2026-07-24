import Image from "next/image";
import { Suspense } from "react";
import { HeroSearchForm } from "./hero-search-form";

export const HeroSection = () => {
  return (
    <section className="relative pb-12 sm:pb-16">
      <div className="relative h-90 sm:h-110">
        <Image
          src="/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Znajdź wydarzenie, na które czekasz
          </h1>
          <p className="mt-3 text-base text-white/85 sm:text-lg">
            Koncerty, festiwale, teatr i sport — wszystko w jednym miejscu.
          </p>
        </div>
      </div>
      <div className="relative z-10 mx-auto -mt-10 max-w-5xl px-6 sm:-mt-14">
        <Suspense>
          <HeroSearchForm />
        </Suspense>
      </div>
    </section>
  );
};
