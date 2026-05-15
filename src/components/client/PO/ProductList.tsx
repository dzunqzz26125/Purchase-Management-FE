import ProItem from "./Product-Item";

const ProList = () => {
  return (
    <section className="bg-white p-md rounded-3xl custom-shadow">
      <div className="flex justify-between mb-md">
        <h3 className="text-primary">Danh sách sản phẩm</h3>
        <button className="text-primary">+ Thêm sản phẩm</button>
      </div>

      <div className="space-y-sm">
        <ProItem />
        <ProItem />
      </div>
    </section>
  );
};

export default ProList;
