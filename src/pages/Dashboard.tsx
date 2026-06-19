import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import MetricCard from "../components/client/Dashboard/MetricCard";
import { analyticsApi } from "../api/analyticsApi";
import { formatVnd } from "../utils/formatVnd";

const Dashboard = () => {
  const [filterType, setFilterType] = useState<"today" | "7days" | "month" | "custom">("month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [activityPage, setActivityPage] = useState(1);
  const activityLimit = 5;
  
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Calculate dates based on filter selection
  const dates = useMemo(() => {
    const end = new Date();
    let start = new Date();
    
    if (filterType === "today") {
      start.setHours(0, 0, 0, 0);
    } else if (filterType === "7days") {
      start.setDate(end.getDate() - 7);
      start.setHours(0, 0, 0, 0);
    } else if (filterType === "month") {
      start = new Date(end.getFullYear(), end.getMonth(), 1);
      start.setHours(0, 0, 0, 0);
    } else if (filterType === "custom") {
      const parsedStart = customStart ? new Date(customStart) : undefined;
      const parsedEnd = customEnd ? new Date(customEnd) : undefined;
      if (parsedStart) parsedStart.setHours(0, 0, 0, 0);
      if (parsedEnd) parsedEnd.setHours(23, 59, 59, 999);
      
      return {
        startDate: parsedStart?.toISOString(),
        endDate: parsedEnd?.toISOString(),
      };
    }
    
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  }, [filterType, customStart, customEnd]);

  // Main Dashboard Statistics Query
  const { 
    data, 
    isLoading: isStatsLoading, 
    isFetching: isStatsFetching,
    refetch: refetchStats 
  } = useQuery({
    queryKey: ["analytics", "dashboard", dates],
    queryFn: () => analyticsApi.dashboard(dates),
    refetchInterval: 10000, // Real-time polling every 10s
  });

  // Paginated Activity Query
  const { 
    data: activityData, 
    isLoading: isActivitiesLoading,
    isFetching: isActivitiesFetching,
    refetch: refetchActivities 
  } = useQuery({
    queryKey: ["analytics", "activities", dates, activityPage],
    queryFn: () => analyticsApi.activities({ page: activityPage, limit: activityLimit, ...dates }),
    refetchInterval: 10000, // Real-time polling every 10s
  });

  // Update last updated timestamp whenever query successfully fetches
  useEffect(() => {
    if (data) {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString("vi-VN"));
    }
  }, [data]);

  const handleRefresh = async () => {
    await Promise.all([refetchStats(), refetchActivities()]);
  };

  const s = data?.summary;
  const isRefreshing = isStatsFetching || isActivitiesFetching;

  // Pagination helper
  const handlePrevPage = () => {
    if (activityPage > 1) {
      setActivityPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = activityData?.pagination.pages ?? 1;
    if (activityPage < totalPages) {
      setActivityPage((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-lg">
      
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-md border-b border-surface-container pb-md">
        <div>
          <h1 className="font-h1 text-h1 text-primary">Bảng điều khiển</h1>
          <p className="mt-xs text-body-md text-secondary">
            Tổng quan kho hàng — cập nhật thời gian thực (10s)
          </p>
        </div>
        
        {/* Controls: Date filter & Refresh */}
        <div className="flex flex-wrap items-center gap-sm">
          {/* Quick date range filters */}
          <div className="bg-surface-container-low p-xs rounded-xl flex gap-xs border border-surface-container">
            <button
              onClick={() => { setFilterType("month"); setActivityPage(1); }}
              className={`px-sm py-1.5 text-label-sm rounded-lg transition-all cursor-pointer ${
                filterType === "month" ? "bg-white text-primary font-semibold shadow-sm" : "text-secondary hover:text-primary"
              }`}
            >
              Tháng này
            </button>
            <button
              onClick={() => { setFilterType("7days"); setActivityPage(1); }}
              className={`px-sm py-1.5 text-label-sm rounded-lg transition-all cursor-pointer ${
                filterType === "7days" ? "bg-white text-primary font-semibold shadow-sm" : "text-secondary hover:text-primary"
              }`}
            >
              7 ngày qua
            </button>
            <button
              onClick={() => { setFilterType("today"); setActivityPage(1); }}
              className={`px-sm py-1.5 text-label-sm rounded-lg transition-all cursor-pointer ${
                filterType === "today" ? "bg-white text-primary font-semibold shadow-sm" : "text-secondary hover:text-primary"
              }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => { setFilterType("custom"); setActivityPage(1); }}
              className={`px-sm py-1.5 text-label-sm rounded-lg transition-all cursor-pointer ${
                filterType === "custom" ? "bg-white text-primary font-semibold shadow-sm" : "text-secondary hover:text-primary"
              }`}
            >
              Tùy chọn
            </button>
          </div>

          {/* Manual refresh button */}
          <div className="flex items-center gap-xs text-label-xs text-secondary bg-surface-container-low border border-surface-container px-sm py-xs rounded-xl">
            <span>Cập nhật: {lastUpdated || "Đang tải..."}</span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-0.5 text-secondary hover:text-primary disabled:opacity-50 cursor-pointer"
              title="Làm mới dữ liệu"
            >
              <span className={`material-symbols-outlined text-[18px] ${isRefreshing ? "animate-spin" : ""}`}>
                sync
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Date Picker Inputs */}
      {filterType === "custom" && (
        <div className="p-md rounded-2xl bg-surface-container-low border border-surface-container flex flex-wrap items-end gap-md">
          <label className="block">
            <span className="text-label-sm text-secondary">Từ ngày:</span>
            <input
              type="date"
              className="mt-xs block w-full rounded-xl border border-outline-variant px-sm py-xs bg-white text-body-md"
              value={customStart}
              onChange={(e) => { setCustomStart(e.target.value); setActivityPage(1); }}
            />
          </label>
          <label className="block">
            <span className="text-label-sm text-secondary">Đến ngày:</span>
            <input
              type="date"
              className="mt-xs block w-full rounded-xl border border-outline-variant px-sm py-xs bg-white text-body-md"
              value={customEnd}
              onChange={(e) => { setCustomEnd(e.target.value); setActivityPage(1); }}
            />
          </label>
        </div>
      )}

      {isStatsLoading ? (
        <div className="text-center py-xl text-secondary">
          <span className="material-symbols-outlined animate-spin text-[40px] mb-xs">
            progress_activity
          </span>
          <p>Đang tải báo cáo tổng quan...</p>
        </div>
      ) : (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 gap-sm md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Tổng SKU"
              value={String(s?.totalProducts ?? 0)}
              icon="category"
              badge="Hoạt động"
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
              title="Doanh thu Bán hàng"
              value={formatVnd(s?.periodRevenue ?? 0)}
              icon="payments"
              iconWrapperClassName="bg-secondary-fixed"
              iconClassName="text-secondary"
              badge={`${s?.periodOrders ?? 0} đơn hoàn tất`}
              badgeClassName="text-secondary bg-secondary-fixed/30"
            />
            <MetricCard
              title="Đã thu từ Khách hàng"
              value={formatVnd(s?.periodCollected ?? 0)}
              icon="bolt"
              iconWrapperClassName="bg-tertiary-fixed"
              iconClassName="text-tertiary"
              badge="Thu tiền mặt/ck"
              badgeClassName="text-tertiary bg-tertiary-fixed/30"
            />
            <MetricCard
              title="Tổng nhập từ NCC"
              value={formatVnd(s?.periodImported ?? 0)}
              icon="inventory_2"
              iconWrapperClassName="bg-indigo-100"
              iconClassName="text-indigo-700"
              badge={`${s?.periodPOCount ?? 0} đơn nhập`}
              badgeClassName="text-indigo-700 bg-indigo-50"
            />
            <MetricCard
              title="Đã trả Nhà cung cấp"
              value={formatVnd(s?.periodPaidToProviders ?? 0)}
              icon="account_balance_wallet"
              iconWrapperClassName="bg-teal-100"
              iconClassName="text-teal-700"
              badge="Thanh toán"
              badgeClassName="text-teal-700 bg-teal-50"
            />
          </div>

          {/* Top products and Debt */}
          <div className="grid grid-cols-1 gap-sm lg:grid-cols-2">
            <div className="rounded-2xl border border-surface-container bg-surface-bright p-lg flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-primary mb-md">Top sản phẩm bán chạy (Trong kỳ)</h3>
                <ul className="space-y-sm">
                  {(data?.topProducts ?? []).map((p) => (
                    <li
                      key={String(p.productId)}
                      className="flex justify-between text-label-sm border-b border-surface-container/30 pb-xs"
                    >
                      <span className="truncate pr-xs font-medium text-on-surface">{p.name || p.sku || "—"}</span>
                      <span className="font-semibold text-primary shrink-0">
                        {formatVnd(p.revenue)} ({p.totalQty} sp)
                      </span>
                    </li>
                  ))}
                  {!data?.topProducts?.length && (
                    <li className="text-secondary text-label-sm py-md text-center">Chưa có dữ liệu giao dịch trong kỳ</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-surface-container bg-surface-bright p-lg flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-primary mb-md">Tổng quan công nợ</h3>
                <div className="space-y-md">
                  <div className="flex justify-between p-md rounded-xl bg-error-container/20 border border-error/10">
                    <div className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-error">assignment_return</span>
                      <span className="text-label-sm font-medium">Phải trả NCC (Tổng nợ NCC)</span>
                    </div>
                    <span className="font-bold text-error text-body-lg">
                      {formatVnd(data?.debtReport.payables ?? 0)}
                    </span>
                  </div>
                  <div className="flex justify-between p-md rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-emerald-700">assignment_turned_in</span>
                      <span className="text-label-sm font-medium">Phải thu Khách hàng (KH nợ)</span>
                    </div>
                    <span className="font-bold text-emerald-700 text-body-lg">
                      {formatVnd(data?.debtReport.receivables ?? 0)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-label-xs text-secondary italic mt-md">
                * Công nợ được tính lũy kế toàn thời gian của nhà cung cấp và khách hàng hoạt động.
              </p>
            </div>
          </div>

          {/* Stock by Categories */}
          <div className="rounded-2xl border border-surface-container bg-surface-bright p-lg">
            <h3 className="font-semibold text-primary mb-md">Tồn kho theo danh mục</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
              {(data?.stockByCategory ?? []).map((cat) => (
                <div
                  key={String(cat._id)}
                  className="p-md rounded-xl bg-surface-container-low border border-surface-container/50"
                >
                  <p className="text-label-sm text-secondary font-medium">
                    {cat.categoryName || "Khác"}
                  </p>
                  <p className="text-h3 font-bold text-primary mt-xs">
                    {cat.totalStock.toLocaleString()} đơn vị
                  </p>
                  <p className="text-label-xs text-secondary mt-0.5">
                    {cat.productCount} SKU
                  </p>
                </div>
              ))}
              {!data?.stockByCategory?.length && (
                <p className="text-secondary text-label-sm col-span-3 text-center py-md">Chưa có phân loại hàng hóa</p>
              )}
            </div>
          </div>

          {/* Paginated Warehouse Activity Log */}
          <div className="rounded-2xl border border-surface-container bg-surface-bright overflow-hidden">
            <div className="px-lg py-md border-b border-surface-container bg-surface-container-low/50 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-primary">Nhật ký hoạt động kho (Real-time)</h3>
                <p className="text-label-xs text-secondary">
                  Lịch sử nhập, xuất, điều chỉnh tồn kho chi tiết
                </p>
              </div>
              {isActivitiesFetching && (
                <span className="material-symbols-outlined animate-spin text-secondary text-[18px]">
                  sync
                </span>
              )}
            </div>

            {isActivitiesLoading ? (
              <p className="p-lg text-secondary text-center">Đang tải nhật ký hoạt động...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-label-sm">
                  <thead className="bg-surface-container-low text-secondary border-b border-surface-container">
                    <tr>
                      <th className="px-lg py-sm">Thời gian</th>
                      <th className="px-lg py-sm">Sản phẩm</th>
                      <th className="px-lg py-sm">Loại hoạt động</th>
                      <th className="px-lg py-sm text-right">SL thay đổi</th>
                      <th className="px-lg py-sm text-center">Thay đổi tồn</th>
                      <th className="px-lg py-sm">Chứng từ liên quan</th>
                      <th className="px-lg py-sm">Người thực hiện</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activityData?.activities ?? []).map((act) => {
                      const timeStr = act.createdAt 
                        ? new Date(act.createdAt).toLocaleString("vi-VN") 
                        : "—";
                      
                      let typeLabel = "Điều chỉnh";
                      let typeBadgeClass = "bg-surface-container text-secondary";
                      if (act.type === "import") {
                        typeLabel = "Nhập kho";
                        typeBadgeClass = "bg-emerald-100 text-emerald-700";
                      } else if (act.type === "export") {
                        typeLabel = "Xuất kho";
                        typeBadgeClass = "bg-amber-100 text-amber-700";
                      }

                      return (
                        <tr key={act._id} className="border-b border-surface-container hover:bg-surface-container-low/20">
                          <td className="px-lg py-sm text-secondary">{timeStr}</td>
                          <td className="px-lg py-sm">
                            <p className="font-semibold text-primary">{act.productId?.name || "—"}</p>
                            <p className="text-label-xs text-secondary">SKU: {act.productId?.sku || "—"}</p>
                          </td>
                          <td className="px-lg py-sm">
                            <span className={`px-sm py-0.5 rounded-full text-label-xs ${typeBadgeClass}`}>
                              {typeLabel}
                            </span>
                          </td>
                          <td className="px-lg py-sm text-right font-semibold">
                            {act.type === "export" ? "-" : "+"}
                            {act.qty} {act.productId?.unit}
                          </td>
                          <td className="px-lg py-sm text-center text-secondary">
                            {act.before} &rarr; {act.after}
                          </td>
                          <td className="px-lg py-sm">
                            <p className="font-medium text-on-surface">{act.batchCode || "—"}</p>
                            <p className="text-label-xs text-secondary capitalize">{act.referenceType}</p>
                          </td>
                          <td className="px-lg py-sm text-secondary">
                            {act.createdBy?.name || "—"}
                          </td>
                        </tr>
                      );
                    })}
                    {!activityData?.activities.length && (
                      <tr>
                        <td colSpan={7} className="text-center py-lg text-secondary">
                          Chưa có nhật ký hoạt động nào trong kỳ này
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {activityData && activityData.pagination.pages > 1 && (
              <div className="px-lg py-sm bg-surface-container-low/50 border-t border-surface-container flex items-center justify-between">
                <span className="text-label-xs text-secondary">
                  Hiển thị {activityData.activities.length}/{activityData.pagination.total} hoạt động
                </span>
                
                <div className="flex items-center gap-xs">
                  <button
                    onClick={handlePrevPage}
                    disabled={activityPage <= 1}
                    className="p-1 rounded-lg border border-surface-container bg-white text-secondary hover:text-primary disabled:opacity-40 cursor-pointer active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px] block">chevron_left</span>
                  </button>
                  <span className="text-label-sm font-semibold text-primary px-sm">
                    Trang {activityPage} / {activityData.pagination.pages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={activityPage >= activityData.pagination.pages}
                    className="p-1 rounded-lg border border-surface-container bg-white text-secondary hover:text-primary disabled:opacity-40 cursor-pointer active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px] block">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
