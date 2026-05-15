export function ShippingMethod() {
  return (
    <section className="bg-surface-container-lowest p-md rounded-3xl">
      <h4 className="font-bold text-primary mb-sm">Phương Thức Vận Chuyển</h4>
      <div className="flex gap-md">
        <button className="p-md border rounded-xl">Nhanh</button>
        <button className="p-md border rounded-xl">Hỏa tốc</button>
      </div>
    </section>
  );
}

// ================= OrderSummary.jsx =================
export function OrderSummary() {
  return (
    <div className="bg-primary-container text-white p-md rounded-3xl">
      <h4>Tổng Quan</h4>
      <p>Tổng: 92.430.000đ</p>
      <button className="bg-white text-primary p-sm rounded-xl mt-md w-full">
        Xác nhận
      </button>
    </div>
  );
}
