import { Suspense } from "react";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/libs/supabase/server";
import { Spinner } from "@/libs/ui/spinner";
import { Provider } from "@/modules/user-profile/presentation/context";
import { Main } from "@/modules/user-profile/presentation/main";
import { PageShell } from "@/modules/user-profile/presentation/page-shell";

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
    <PageShell>
      <Suspense fallback={<Spinner />}>
        <Guard />
      </Suspense>
    </PageShell>
  );
};
