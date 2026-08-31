import { Provider } from "@/modules/event-creation/presentation/context";
import { Main } from "@/modules/event-creation/presentation/main";

export const Module = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};
