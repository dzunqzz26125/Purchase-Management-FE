export function ProductTable() {
  return (
    <section className="bg-surface-container-lowest p-md rounded-3xl">
      <h4 className="font-bold text-primary mb-sm">Danh Sách Sản Phẩm</h4>
      <table className="w-full">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Macbook M3</td>
            <td>2</td>
            <td>39.990.000đ</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
