import type { ProductTableItem } from "../../../types/product";
import InventoryRow from "./InventoryRow";

type InventoryTableProps = {
  data: ProductTableItem[];
  loading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const InventoryTable = ({
  data,
  loading = false,
  onEdit,
  onDelete,
}: InventoryTableProps) => {
  return (
    <section className="bg-surface-container-lowest rounded-[24px] shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] overflow-hidden mb-md">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50 border-b border-surface-container/50">
              <th className="px-md py-md font-label-sm text-label-sm text-secondary">
                SKU
              </th>
              <th className="px-md py-md font-label-sm text-label-sm text-secondary">
                Sản phẩm
              </th>
              <th className="px-md py-md font-label-sm text-label-sm text-secondary">
                Phân loại
              </th>
              <th className="px-md py-md font-label-sm text-label-sm text-secondary">
                Mức tồn kho
              </th>
              <th className="px-md py-md font-label-sm text-label-sm text-secondary">
                Trạng thái
              </th>
              <th className="px-md py-md font-label-sm text-label-sm text-secondary text-right">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/30">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-md py-xl text-center text-secondary">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-md py-xl text-center text-secondary">
                  Chưa có sản phẩm nào
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <InventoryRow
                  key={item._id}
                  item={item}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-md py-md bg-surface-container-low/30 border-t border-surface-container flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-secondary">
          Hiển thị {data.length} sản phẩm
        </span>
      </div>
    </section>
  );
};

export default InventoryTable;
