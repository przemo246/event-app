import { Module as LoginModule } from "@/core/modules/login";
import { AuthModeTabs } from "@/shared/auth-mode-tabs/auth-mode-tabs";

const Page = () => {
  return (
    <div className="flex items-center justify-center px-6 py-12 h-full">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg sm:p-8">
        <LoginModule tabs={<AuthModeTabs />} />
      </div>
    </div>
  );
};

export default Page;
