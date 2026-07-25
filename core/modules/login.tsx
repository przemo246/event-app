import type { ReactNode } from "react";
import { Provider } from "@/modules/login/presentation/context";
import { Main } from "@/modules/login/presentation/main";

type ModuleProps = {
  tabs: ReactNode;
};

export const Module = ({ tabs }: ModuleProps) => {
  return (
    <Provider>
      <Main tabs={tabs} />
    </Provider>
  );
};
