import { Provider } from "@/modules/search/presentation/context";
import { Main } from "@/modules/search/presentation/main";

export const Module = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};
