import FilterBar from "../components/client/products/FilterBar";
import InventoryTable from "../components/client/products/InventoryTable";
import StatCard from "../components/client/products/StatCard";

const mockData = [
  {
    sku: "EL-MW-001",
    name: "Tai nghe Bluetooth Sony WH",
    category: "Điện tử",
    stock: 85,
    status: "ok",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjiKF-_b21LHyosjeYTSfhfS_nAtlkLUHRAYAvNaLCNfBOG3wrZXWp_4VKAGK6H3tcGvPLvUfX0du3jvKNwxiaXr_gk8cpTzk1-Ke6XtSyuOemlHhZGpzP-_a5cxZozQsNQAtOvnlvOUXTIfawifETZ3EkQ0oJkDew4XPK6NIKsDymmo85p3L-Y3AfIEWKMcSfXJ319k24ABYui_VqHgUxQD2JiYMkCt0klhvPaie2_-fKGAQD4zX8_Ru9zpbnuwbfzlWxEWMPUHk",
  },
  {
    sku: "HO-KT-452",
    name: "Ấm siêu tốc Ceramic White",
    category: "Gia dụng",
    stock: 12,
    status: "low",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDivPpSHJWBIZgWZhD_VfbckZhSW5V8cXRMOWl8LFkW3kIe4b7EmnMkCKVrhCkoTpfWEhO2VmjdXYVnHHqBuZ-SXrRPzCaavCyxXvOunb92eUQbqUDLFpNaG0poMg_pohRDQHyXm43WvHfVmk0yG7mvWGCU1bYMc4mfeot7GBrhIsTwaQh8nO90O2pgzWqRo1cdp4KC4Q7e-K1NHZMVSVE0QIie-sJ7BBi78XawDFjLiuZHucgCLOp1zYNmWefxylWFoZAzj6u3d5s",
  },
  {
    sku: "OF-CH-992",
    name: "Ghế công thái học Pro X",
    category: "Nội thất",
    stock: 45,
    status: "pending",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBu-YV7gUBbzbXBJ3mV1tL_faiTE79LtPPbjT3KIbBG8-grZvCBNqO5KG91_gwS_Th2BQ9gtNrEfQpwU23Z6065EQdpf-jj7H6VtYqzBx0_0c0eGXwN0iOypeT8PbvwuMMFH-50JivWUUgj4epoD00Rm_ZThxVW83IXYEQNJ7vqdkNDkfyy0MiTHyXLaMEkR_-xzdA_ncH1zquc7Ly0xkb4NXVXF1wD84A8DddzKp0JUkAgjVsvwfAui_fNOey7SNJtCf3j38kC84w",
  },
  {
    sku: "LI-LP-122",
    name: "Máy tính xách tay Ultra 13",
    category: "Điện tử",
    stock: 62,
    status: "ok",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpdPxz9i3_P8U_APp0YWamg4W1fvaScQ7qGElbeFz_Z5kJvWLLEyS3xHax5KiSyvlKCS-Euej5DzTIeJ29-xLJb8sTQN_-tBgH8Lh0GwbBuUKLtYd66mUOZJkW9abf27RtzWqcuxgkPGIm-kVF9kLjXOVz8tYzxEcuMQzlCjQf26SgA4pMJvK3wAmTJWpMYXJEAvcvoORvQfd42WJxrggdJHyIhdDUgJQUNwp4mhsaiwU4t3gqmkRYLL91eFRm8Fw_Nlzz1x6s5Zg",
  },
];

const Inventory = () => {
  return (
    <>
      <FilterBar />
      <InventoryTable data={mockData} />
      <StatCard />
    </>
  );
};

export default Inventory;
