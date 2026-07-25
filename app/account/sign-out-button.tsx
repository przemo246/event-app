"use client";

import { Button } from "@/libs/ui/button";
import { createClient } from "@/libs/supabase/client";

export const SignOutButton = () => {
  const handlePress = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.assign("/");
  };

  return (
    <Button variant="outline" onPress={handlePress}>
      Wyloguj się
    </Button>
  );
};
