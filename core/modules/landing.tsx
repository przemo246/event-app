import { Provider } from "@/modules/landing/presentation/context";
import { Main } from "@/modules/landing/presentation/main";

export const Module = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};
