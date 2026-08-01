import { Provider } from "@/modules/register/presentation/context";
import { Main } from "@/modules/register/presentation/main";

export const Module = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};
