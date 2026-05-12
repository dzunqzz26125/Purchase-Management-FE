const Topbar = () => {
  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-surface/80 px-md py-xs shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] backdrop-blur-md">
      <div className="flex max-w-xl flex-1 items-center">
        <div className="relative w-full overflow-hidden rounded-xl bg-surface-container-low transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-container">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-secondary">
            search
          </span>
          <input
            className="w-full border-none bg-transparent py-xs pl-xl pr-md text-body-md focus:ring-0"
            placeholder="Tìm kiếm hàng hóa, đơn hàng..."
            type="text"
          />
        </div>
      </div>

      <div className="ml-md flex items-center gap-md">
        <button className="rounded-full p-xs text-secondary transition-all hover:bg-surface-container-low">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="rounded-full p-xs text-secondary transition-all hover:bg-surface-container-low">
          <span className="material-symbols-outlined">settings</span>
        </button>

        <div className="ml-xs flex items-center gap-sm">
          <img
            alt="Manager"
            className="h-10 w-10 rounded-full border-2 border-primary-container/20 object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCitEQNTl_wiBQkxcHHjRU02g_YBLjqA42PTEiQjGpn76GO8BkbSzTZPcrrK04eLgAC-eDUTcfcco30R-yxg5vhRdb9gGJ_D4TlqUnhoeUBDnWrMZkORgM5Y7Q9mzPTN18WgA-CmxXY_LF19Cp0tXcxX7kSX89C4TzlAdoH0tYNcHmPPEATxcZlJp3eoAQYeqsTDPwyBAeS5lij3ngO--khI9yp8rYbFi2DT7XtRi-RlAhxYbYwL-eCwWgIm65aolDreNjuCSKU-Tk"
          />
          <div className="hidden lg:block">
            <p className="text-label-sm font-bold text-primary">Nguyễn Văn A</p>
            <p className="text-label-xs text-secondary">Quản lý kho</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
