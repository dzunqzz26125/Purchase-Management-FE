import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "../api/analyticsApi";
import { formatVnd } from "../utils/formatVnd";

const ReportPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "dashboard"],
    queryFn: () => analyticsApi.dashboard(),
  });

  if (isLoading) {
    return <p className="text-secondary">Đang tải báo cáo...</p>;
  }

  const s = data?.summary;

  return (
    <div className="space-y-lg">
      <h1 className="text-h2 text-primary">Báo cáo & Phân tích</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-md">
        <article className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
          <h2 className="text-label-sm text-secondary">Doanh thu tháng</h2>
          <p className="text-h2 font-bold text-primary mt-sm">
            {formatVnd(s?.monthlyRevenue ?? 0)}
          </p>
        </article>
        <article className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
          <h2 className="text-label-sm text-secondary">Đã thu</h2>
          <p className="text-h2 font-bold text-emerald-700 mt-sm">
            {formatVnd(s?.monthlyCollected ?? 0)}
          </p>
        </article>
        <article className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
          <h2 className="text-label-sm text-secondary">Đơn bán hoàn tất</h2>
          <p className="text-h2 font-bold text-primary mt-sm">
            {s?.completedSalesOrders ?? 0}
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
        <h2 className="font-semibold text-primary mb-md">Báo cáo công nợ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="p-md rounded-xl bg-error-container/15">
            <p className="text-label-sm text-secondary">Công nợ phải trả (NCC)</p>
            <p className="text-h3 font-bold text-error">
              {formatVnd(data?.debtReport.payables ?? 0)}
            </p>
          </div>
          <div className="p-md rounded-xl bg-emerald-50">
            <p className="text-label-sm text-secondary">Công nợ phải thu (KH)</p>
            <p className="text-h3 font-bold text-emerald-700">
              {formatVnd(data?.debtReport.receivables ?? 0)}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
        <h2 className="font-semibold text-primary mb-md">Top sản phẩm bán chạy</h2>
        <table className="w-full text-label-sm">
          <thead className="text-secondary border-b border-surface-container">
            <tr>
              <th className="text-left py-sm">Sản phẩm</th>
              <th className="text-right py-sm">SL</th>
              <th className="text-right py-sm">Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {(data?.topProducts ?? []).map((p) => (
              <tr key={String(p.productId)} className="border-b border-surface-container">
                <td className="py-sm">{p.name || p.sku}</td>
                <td className="py-sm text-right">{p.totalQty}</td>
                <td className="py-sm text-right font-semibold">
                  {formatVnd(p.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
        <h2 className="font-semibold text-primary mb-md">Tình trạng tồn kho</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          {(data?.stockByCategory ?? []).map((cat) => (
            <div
              key={String(cat._id)}
              className="flex justify-between p-sm rounded-xl bg-surface-container-low"
            >
              <span>{cat.categoryName || "Khác"}</span>
              <span className="font-semibold">{cat.totalStock} units</span>
            </div>
          ))}
        </div>
        <p className="mt-md text-label-sm text-secondary">
          Sản phẩm sắp hết: <strong>{s?.lowStockProducts ?? 0}</strong>
        </p>
      </section>
    </div>
  );
};

export default ReportPage;
