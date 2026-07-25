import type { ReactNode } from "react";
import { Provider } from "@/modules/register/presentation/context";
import { Main } from "@/modules/register/presentation/main";

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
