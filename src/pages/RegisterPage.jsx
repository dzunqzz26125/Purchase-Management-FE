import AuthLeftPanel from "../auth/register/AuthLeftPanel";
import RegisterMain from "../auth/register/RegisterMain";

const Signup = () => {
  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md">
      <main className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-surface-container-lowest rounded-2xl overflow-hidden soft-shadow min-h-[800px]">
        <AuthLeftPanel />
        <RegisterMain />
      </main>
      <div className="fixed bottom-md right-md hidden sm:block">
        <button className="w-12 h-12 bg-surface-container-lowest border border-surface-container-highest rounded-full soft-shadow flex items-center justify-center text-primary hover:bg-primary-fixed transition-all group">
          <span className="material-symbols-outlined">help</span>
          <span className="absolute right-full mr-sm bg-inverse-surface text-inverse-on-surface px-sm py-xs rounded-lg text-label-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Hỗ trợ kỹ thuật
          </span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
