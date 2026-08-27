import { Provider } from "@/modules/user-profile/presentation/context";
import { Main } from "@/modules/user-profile/presentation/main";

export const Module = () => {
  return (
    <div className="mx-auto w-full max-w-130 px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold text-foreground">
        Ustawienia konta
      </h1>
      <Provider>
        <Main />
      </Provider>
    </div>
  );
};
