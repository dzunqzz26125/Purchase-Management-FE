import type { Product } from "../../../types/product";
import { getStockStatus } from "../../../utils/productHelpers";

type StatCardProps = {
  totalProducts: number;
  products: Product[];
};

const StatCard = ({ totalProducts, products }: StatCardProps) => {
  const lowStockCount = products.filter(
    (p) => getStockStatus(p.stock, p.minStock) === "low",
  ).length;

  const totalInventoryValue = products.reduce(
    (sum, p) => sum + p.costPrice * p.stock,
    0,
  );

  const formatVnd = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl mt-md">
      <div className="bg-primary-container p-md rounded-3xl text-on-primary shadow-lg flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <span className="material-symbols-outlined p-xs bg-white/10 rounded-xl">
            inventory_2
          </span>
        </div>
        <div>
          <p className="font-label-sm text-label-sm text-white/80">
            Tổng sản phẩm
          </p>
          <h4 className="font-h3 text-h3 font-bold">{totalProducts}</h4>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-md rounded-3xl shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] border border-surface-container/20 flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <span className="material-symbols-outlined p-xs bg-error-container/20 text-error rounded-xl">
            warning
          </span>
          <span className="text-label-xs font-label-xs text-error font-semibold">
            Cần chú ý
          </span>
        </div>
        <div>
          <p className="font-label-sm text-label-sm text-secondary">
            Sản phẩm sắp hết hàng
          </p>
          <h4 className="font-h3 text-h3 font-bold text-on-surface">
            {lowStockCount} sản phẩm
          </h4>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-md rounded-3xl shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] border border-surface-container/20 flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <span className="material-symbols-outlined p-xs bg-secondary-container/30 text-primary rounded-xl">
            trending_up
          </span>
        </div>
        <div>
          <p className="font-label-sm text-label-sm text-secondary">
            Giá trị tồn kho (theo giá vốn)
          </p>
          <h4 className="font-h3 text-h3 font-bold text-on-surface">
            {formatVnd(totalInventoryValue)}
          </h4>
        </div>
      </div>
    </section>
  );
};

export default StatCard;
