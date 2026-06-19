import type { Customer } from "../../../types/customer";
import { formatVnd } from "../../../utils/formatVnd";

type CustomerTableProps = {
  data: Customer[];
  loading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const CustomerTable = ({
  data,
  loading = false,
  onEdit,
  onDelete,
}: CustomerTableProps) => {
  return (
    <section className="bg-surface-container-lowest rounded-[24px] shadow-[0_10px_30px_-5px_rgba(30,58,138,0.05)] overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50 border-b border-surface-container/50">
              <th className="px-md py-md font-label-sm text-secondary">Tên KH</th>
              <th className="px-md py-md font-label-sm text-secondary">Liên hệ</th>
              <th className="px-md py-md font-label-sm text-secondary">Địa chỉ</th>
              <th className="px-md py-md font-label-sm text-secondary">Công nợ</th>
              <th className="px-md py-md font-label-sm text-secondary text-right">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/30">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-md py-xl text-center text-secondary">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-md py-xl text-center text-secondary">
                  Chưa có khách hàng. Nhấn &quot;Thêm khách hàng&quot; để tạo mới.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item._id} className="hover:bg-surface-container-low/40">
                  <td className="px-md py-md">
                    <p className="font-semibold text-on-surface">{item.name}</p>
                    {item.note && (
                      <p className="text-label-xs text-secondary mt-0.5 line-clamp-1">
                        {item.note}
                      </p>
                    )}
                  </td>
                  <td className="px-md py-md text-label-sm text-secondary">
                    <p>{item.phone || "—"}</p>
                    <p className="text-label-xs">{item.email || ""}</p>
                  </td>
                  <td className="px-md py-md text-label-sm text-secondary max-w-[200px] truncate">
                    {item.address || "—"}
                  </td>
                  <td className="px-md py-md">
                    <span
                      className={`font-semibold text-label-sm ${
                        item.debt > 0 ? "text-error" : "text-emerald-600"
                      }`}
                    >
                      {formatVnd(item.debt)}
                    </span>
                  </td>
                  <td className="px-md py-md text-right">
                    <div className="flex justify-end gap-xs">
                      <button
                        type="button"
                        onClick={() => onEdit(item._id)}
                        className="p-xs rounded-lg text-primary hover:bg-primary-container/30 transition-colors"
                        title="Sửa"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item._id)}
                        className="p-xs rounded-lg text-error hover:bg-error-container/30 transition-colors"
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="px-md py-md bg-surface-container-low/30 border-t border-surface-container">
        <span className="font-label-sm text-secondary">
          Hiển thị {data.length} khách hàng
        </span>
      </div>
    </section>
  );
};

export default CustomerTable;
