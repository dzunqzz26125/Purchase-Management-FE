const LocationSelector = () => {
  return (
    <section className="bg-white p-md rounded-3xl custom-shadow">
      <h3 className="text-primary mb-md">Chọn khu lưu trữ</h3>

      <div className="grid md:grid-cols-3 gap-md">
        <div className="p-md border rounded-xl cursor-pointer">Khu A-01</div>
        <div className="p-md border rounded-xl cursor-pointer">Khu B-12</div>
      </div>
    </section>
  );
};

export default LocationSelector;
