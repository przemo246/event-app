import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Module as UserProfileModule } from "@/core/modules/user-profile";
import { supabaseServer } from "@/libs/supabase/server";

const AccountProfileGuard = async () => {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/auth/login");
  }

  return <UserProfileModule />;
};

const Page = () => {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12 h-full">
      <h1 className="mb-8 text-2xl font-bold text-foreground">
        Ustawienia konta
      </h1>
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Wczytywanie...</p>
        }
      >
        <AccountProfileGuard />
      </Suspense>
    </div>
  );
};

export default Page;
