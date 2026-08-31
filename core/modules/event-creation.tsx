import { Suspense } from "react";

import { Spinner } from "@/libs/ui/spinner";
import { Provider } from "@/modules/event-creation/presentation/context";
import { Main } from "@/modules/event-creation/presentation/main";

export const Module = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Provider>
        <Main />
      </Provider>
    </Suspense>
  );
};
