import StockChart from "../components/client/Dashboard/Chart";
import MetricCard from "../components/client/Dashboard/MetricCard";
import Storage from "../components/client/Dashboard/Storage";
import RecentTable from "../components/client/Dashboard/Table";

const Dashboard = () => {
  return (
    <div className="space-y-lg">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-h1 text-h1 text-primary">Bảng điều khiển</h1>
          <p className="mt-xs text-body-md text-secondary">
            Tổng quan hoạt động kho hàng hôm nay, 24 Tháng 5, 2024
          </p>
        </div>
        <button className="rounded-xl border border-surface-container bg-white px-md py-sm font-semibold text-primary custom-shadow transition-all hover:bg-surface-container-low">
          Xuất báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 gap-sm md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Tổng số SKU"
          value="12,480"
          icon="category"
          badge="+12%"
          badgeClassName="text-emerald-600 bg-emerald-50"
        />
        <MetricCard
          title="Hàng sắp hết"
          value="156"
          icon="warning"
          iconWrapperClassName="bg-error-container"
          iconClassName="text-error"
          badge="Khẩn cấp"
          badgeClassName="text-error bg-error-container/30"
          cardClassName="border-l-4 border-error"
        />
        <MetricCard
          title="Lượt chuyển kho"
          value="842"
          icon="move_up"
          iconWrapperClassName="bg-secondary-fixed"
          iconClassName="text-secondary"
          badge="Hôm nay"
        />
        <MetricCard
          title="Hiệu suất xử lý"
          value="98.4%"
          icon="bolt"
          iconWrapperClassName="bg-tertiary-fixed"
          iconClassName="text-tertiary"
          badge="Tối ưu"
          badgeClassName="text-tertiary bg-tertiary-fixed/30"
        />
      </div>

      <div className="grid grid-cols-1 gap-sm lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StockChart />
        </div>
        <Storage />
      </div>

      <RecentTable />
    </div>
  );
};

export default Dashboard;
