"use client";

import { Button } from "@/libs/ui/button";
import { useContext } from "./context";
import { FacebookIcon, GoogleIcon } from "./social-provider-icons";

export const SocialSignInButtons = () => {
  const facade = useContext();

  return (
    <div className="flex flex-col gap-3">
      <Button
        onPress={() => facade.signInWithOAuth("facebook")}
        variant="outline"
        className="w-full justify-start gap-3 border border-border font-semibold text-foreground hover:bg-muted"
      >
        <FacebookIcon />
        Kontynuuj z Facebookiem
      </Button>
      <Button
        onPress={() => facade.signInWithOAuth("google")}
        variant="outline"
        className="w-full justify-start gap-3 border border-border font-semibold text-foreground hover:bg-muted"
      >
        <GoogleIcon />
        Kontynuuj z Google
      </Button>
    </div>
  );
};
