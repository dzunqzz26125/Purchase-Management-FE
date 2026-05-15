export function CustomerForm() {
  return (
    <section className="bg-surface-container-lowest p-md rounded-3xl">
      <h4 className="font-bold text-primary">Thông Tin Khách Hàng</h4>
      <div className="grid grid-cols-2 gap-md mt-sm">
        <input
          className="bg-surface-container-low rounded-xl p-sm"
          placeholder="Tên khách hàng"
        />
        <input
          className="bg-surface-container-low rounded-xl p-sm"
          placeholder="SĐT"
        />
        <input
          className="col-span-2 bg-surface-container-low rounded-xl p-sm"
          placeholder="Địa chỉ"
        />
      </div>
    </section>
  );
}
