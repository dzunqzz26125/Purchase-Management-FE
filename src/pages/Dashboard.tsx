import { useQuery } from "@tanstack/react-query";
import MetricCard from "../components/client/Dashboard/MetricCard";
import { analyticsApi } from "../api/analyticsApi";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "dashboard"],
    queryFn: analyticsApi.dashboard,
  });

  const s = data?.summary;

  return (
    <div className="space-y-lg">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-h1 text-h1 text-primary">Bảng điều khiển</h1>
          <p className="mt-xs text-body-md text-secondary">
            Tổng quan kho hàng — dữ liệu thời gian thực
          </p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-secondary">Đang tải báo cáo...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-sm md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Tổng SKU"
              value={String(s?.totalProducts ?? 0)}
              icon="category"
              badge="Active"
              badgeClassName="text-emerald-600 bg-emerald-50"
            />
            <MetricCard
              title="Sắp hết hàng"
              value={String(s?.lowStockProducts ?? 0)}
              icon="warning"
              iconWrapperClassName="bg-error-container"
              iconClassName="text-error"
              badge="Cảnh báo"
              badgeClassName="text-error bg-error-container/30"
              cardClassName="border-l-4 border-error"
            />
            <MetricCard
              title="Doanh thu tháng"
              value={`${(s?.monthlyRevenue ?? 0).toLocaleString()}đ`}
              icon="payments"
              iconWrapperClassName="bg-secondary-fixed"
              iconClassName="text-secondary"
              badge={`${s?.monthlyOrders ?? 0} đơn`}
            />
            <MetricCard
              title="Đã thu tháng"
              value={`${(s?.monthlyCollected ?? 0).toLocaleString()}đ`}
              icon="bolt"
              iconWrapperClassName="bg-tertiary-fixed"
              iconClassName="text-tertiary"
              badge="Thu tiền"
              badgeClassName="text-tertiary bg-tertiary-fixed/30"
            />
          </div>

          <div className="grid grid-cols-1 gap-sm lg:grid-cols-2">
            <div className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
              <h3 className="font-semibold text-primary mb-md">Top sản phẩm</h3>
              <ul className="space-y-sm">
                {(data?.topProducts ?? []).map((p) => (
                  <li
                    key={String(p.productId)}
                    className="flex justify-between text-label-sm"
                  >
                    <span>{p.name || p.sku || "—"}</span>
                    <span className="font-semibold text-primary">
                      {p.revenue.toLocaleString()}đ ({p.totalQty} sp)
                    </span>
                  </li>
                ))}
                {!data?.topProducts?.length && (
                  <li className="text-secondary text-label-sm">Chưa có dữ liệu</li>
                )}
              </ul>
            </div>

            <div className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
              <h3 className="font-semibold text-primary mb-md">Công nợ</h3>
              <div className="space-y-md">
                <div className="flex justify-between p-sm rounded-xl bg-error-container/20">
                  <span className="text-label-sm">Phải trả NCC</span>
                  <span className="font-bold text-error">
                    {(data?.debtReport.payables ?? 0).toLocaleString()}đ
                  </span>
                </div>
                <div className="flex justify-between p-sm rounded-xl bg-emerald-50">
                  <span className="text-label-sm">Phải thu KH</span>
                  <span className="font-bold text-emerald-700">
                    {(data?.debtReport.receivables ?? 0).toLocaleString()}đ
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
            <h3 className="font-semibold text-primary mb-md">Tồn theo danh mục</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
              {(data?.stockByCategory ?? []).map((cat) => (
                <div
                  key={String(cat._id)}
                  className="p-md rounded-xl bg-surface-container-low"
                >
                  <p className="text-label-sm text-secondary">
                    {cat.categoryName || "Khác"}
                  </p>
                  <p className="text-h3 font-bold text-primary">
                    {cat.totalStock} đơn vị
                  </p>
                  <p className="text-label-xs text-secondary">
                    {cat.productCount} SKU
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
