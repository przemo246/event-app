import { Provider } from "@/modules/user-profile/presentation/context";
import { Main } from "@/modules/user-profile/presentation/main";

export const Module = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};
