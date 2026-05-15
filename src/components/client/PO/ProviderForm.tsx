const SupplierForm = () => {
  return (
    <section className="bg-surface-container-lowest rounded-3xl p-md custom-shadow">
      <h3 className="text-h3 text-primary mb-md">Thông tin Nhà cung cấp</h3>

      <div className="grid md:grid-cols-2 gap-md">
        <select className="soft-input px-md py-sm rounded-xl">
          <option>Chọn nhà cung cấp...</option>
        </select>

        <input
          className="soft-input px-md py-sm rounded-xl"
          placeholder="BOL..."
        />
      </div>
    </section>
  );
};

export default SupplierForm;
