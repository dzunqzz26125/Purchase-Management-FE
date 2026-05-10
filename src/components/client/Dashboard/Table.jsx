const data = [
  {
    id: "#WH-89021",
    name: "Đồng hồ thông minh Pro",
    type: "Nhập kho",
    location: "Kệ A-12-04",
    status: "Hoàn tất",
    statusClassName: "bg-emerald-50 text-emerald-600",
    time: "2 phút trước",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRhonoPZxhjN3ier2hOr_L86xhrVWCIm4ry6EoScs7VtOkKmIHsOfGIpG4TeUYOVDck_VTUJ1oFHH4dD_ruEUF2w6IyJaqSWmqxpBk_BjjRjnpNCFWKSG5UBjaVz2qjqjjlSfgu3a9E3awu1NZIW1pFD49um-sRrn6KiDoIJCBFimVpDhY84wsgm-I5AslZuUwWVZwWhNgDlxDR-jgOmtTH2w2FBmtBCdNj0eigVhXI2HNK6CM95DSpXASf272Yt1B4wKieWChtHs",
  },
  {
    id: "#WH-89020",
    name: "Tai nghe không dây X1",
    type: "Xuất kho",
    location: "Kệ B-02-11",
    status: "Đang xử lý",
    statusClassName: "bg-secondary-fixed text-primary",
    time: "15 phút trước",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_SgsJMCP6hrUpibXVV3TeYxINkCAS6EmX1vH7rGMSFbGnzACeFbssiYnxCSzQVynZ-4kBZk7ULejKm5sLnsxD58YuMm7jUVbwgDw2k81DR4CuYnP-Aw9FTOeLFJQ7Bywca4xTeFMrw63J53wk68icgJ4Qb2YN_ispVcq7POjnHYIuI6GeI7ZAj59FmOJFVlN2NVgKIxO02zikYjTPbeAWXDEq4JoqKY_xlABKsZi7ww3ZChaygWPgh_FFKaBUqqd96HtBFzyleHo",
  },
  {
    id: "#WH-89019",
    name: "Giày thể thao Velocity",
    type: "Chuyển kho",
    location: "A-01 -> C-05",
    status: "Chờ kiểm tra",
    statusClassName: "bg-error-container/30 text-error",
    time: "42 phút trước",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDswAOISERj3aumNr7UyoofBWjsA-Ko464pVqH4j6_vr6XhEhoAT7iknrimRqsby9PtpavjQ3TNW3U6ILFQlHZ0G7hkF8K5W8pPj5-yIggWmzgAs_WmijreyNeVNZpJLokQ8f9ekfcXM2fpvvm2uAazAynSiXEQclRgzcbk8DSD8SbUAGCYXEYB0dc7N10uH2mr0DBFNHmR86HIUMHPNe3LhXhXHGPyl8qtgSa4qdCIYamX9zzQ3pE4J8AxYpXT5bBECJ5ZpM5Odc",
  },
];

const RecentTable = () => {
  return (
    <div className="overflow-hidden rounded-3xl bg-white custom-shadow">
      <div className="flex items-center justify-between border-b border-surface-container p-md">
        <h4 className="font-h3 text-primary">Chuyển động gần đây</h4>
        <button className="text-label-sm text-primary hover:underline">
          Xem tất cả
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-surface-container-low text-left">
            <th className="px-md py-sm text-label-sm text-secondary">Mã đơn</th>
            <th className="px-md py-sm text-label-sm text-secondary">
              Sản phẩm
            </th>
            <th className="px-md py-sm text-label-sm text-secondary">Loại</th>
            <th className="px-md py-sm text-label-sm text-secondary">Vị trí</th>
            <th className="px-md py-sm text-label-sm text-secondary">
              Trạng thái
            </th>
            <th className="px-md py-sm text-right text-label-sm text-secondary">
              Thời gian
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-surface-container hover:bg-surface-bright"
            >
              <td className="px-md py-md text-label-sm font-bold text-primary">
                {item.id}
              </td>
              <td className="px-md py-md">
                <div className="flex items-center gap-sm">
                  <div className="h-10 w-10 overflow-hidden rounded-lg bg-surface-container-low">
                    <img
                      alt={item.name}
                      src={item.image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-body-md">{item.name}</span>
                </div>
              </td>
              <td className="px-md py-md text-body-md">{item.type}</td>
              <td className="px-md py-md text-body-md">{item.location}</td>
              <td className="px-md py-md">
                <span
                  className={`rounded-full px-sm py-1 text-label-xs ${item.statusClassName}`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-md py-md text-right text-body-md text-secondary">
                {item.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTable;
