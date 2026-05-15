const AuthLeftPanel = () => {
  return (
    <section className="hidden lg:flex flex-col justify-between p-xl bg-primary relative overflow-hidden h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-container/10 rounded-full -ml-48 -mb-48"></div>
        <div className="relative z-10 w-full max-w-[430px]">
          <div className="flex items-center gap-xs mb-xl">
            <span
              className="material-symbols-outlined text-on-primary text-[40px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warehouse
            </span>
            <h1 className="font-h2 text-h2 text-on-primary tracking-tight">
              LogiFlow
            </h1>
          </div>
          <h2 className="font-h1 text-h1 text-on-primary mb-md">
            Optimize your warehouse flow.
          </h2>
          <p className="font-body-lg text-body-lg text-on-primary/80 w-full whitespace-normal break-normal">
            Join thousands of warehouse managers simplifying their supply chain
            operations with real-time tracking and AI-powered insights.
          </p>
        </div>
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-md border border-white/10">
            <div className="flex items-center gap-sm mb-xs">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  verified
                </span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-primary">
                  Enterprise Grade Security
                </p>
                <p className="font-label-xs text-label-xs text-on-primary/60">
                  Your data is protected by industry-leading encryption.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-xl rounded-xl overflow-hidden aspect-video soft-shadow border border-white/5">
            <img
              alt="Modern Warehouse Management System"
              className="w-full h-full object-cover"
              data-alt="A futuristic, high-tech warehouse interior featuring automated guided vehicles and clean, minimalist shelving units. The lighting is soft and professional with a cool blue atmosphere that matches a corporate identity. In the foreground, a transparent digital tablet interface displays complex logistical data charts and inventory maps in a sleek light-mode UI design."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJPiu761w_VeUbm-qImhXEd1298_zXeAWgN0qodWXYD4OmyGrWVefhsFxdAs55OjMjVejnfK0x7wBm0rzzqBl47CCU83BudqgMamy1_xEcf3xkrGyYk9HraxYK5dOGgGGEJMg5pfYB9e4bUTQl-Y8D2kMVfLNn98023uZ2sQioT_2-8BmX4TzI__88E_ETUYnVoMLbIHLNMHTt8OaK143sJMn5YT_2kUwHKxL3pICDXivCYO_WGOE3stL0dr9XkRybNCxSQ9AEiFo"
            />
          </div>
        </div>
    </section>
  );
};

export default AuthLeftPanel;
