import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { SignOutButton } from "./sign-out-button";

const Page = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-foreground">Moje konto</h1>
      <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>

      <div className="mt-8">
        <SignOutButton />
      </div>
    </div>
  );
};

export default Page;
