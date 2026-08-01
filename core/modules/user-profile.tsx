import { Suspense } from "react";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/libs/supabase/server";
import { Spinner } from "@/libs/ui/spinner";
import { Provider } from "@/modules/user-profile/presentation/context";
import { Main } from "@/modules/user-profile/presentation/main";

const Guard = async () => {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/login");
  }

  return (
    <Provider>
      <Main />
    </Provider>
  );
};

export const Module = () => {
  return (
    <div className="mx-auto w-full max-w-130 px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold text-foreground">
        Ustawienia konta
      </h1>
      <Suspense fallback={<Spinner />}>
        <Guard />
      </Suspense>
    </div>
  );
};
