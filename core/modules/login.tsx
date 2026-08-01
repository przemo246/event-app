import { Provider } from "@/modules/login/presentation/context";
import { Main } from "@/modules/login/presentation/main";

export const Module = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};
