const AuthLeftPanel = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-on-primary relative overflow-hidden">
      {/* background blur shapes */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-container/20 rounded-full" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-container/10 rounded-full" />

      {/* top content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-10">
          <span className="material-symbols-outlined text-[40px]">
            warehouse
          </span>
          <h1 className="text-2xl font-bold">LogiFlow</h1>
        </div>

        <h2 className="text-4xl font-bold mb-4 max-w-md">
          Optimize your warehouse flow.
        </h2>

        <p className="text-white/80 max-w-sm">
          Join thousands of warehouse managers using AI-powered logistics.
        </p>
      </div>

      {/* bottom card */}
      <div className="relative z-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">
                verified
              </span>
            </div>

            <div>
              <p className="font-semibold">Enterprise Security</p>
              <p className="text-sm text-white/70">
                End-to-end encryption for all data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLeftPanel;
