import { CustomerForm } from "../components/client/SO/Customer-Form";
import { MapPreview } from "../components/client/SO/Map-Preview";
import { ProductTable } from "../components/client/SO/Product-Table";
import {
  OrderSummary,
  ShippingMethod,
} from "../components/client/SO/Shipping-Method";
import { StockStatus } from "../components/client/SO/Stock-Status";
import Topbar from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";

export default function OutboundPage() {
  return (
    <div className="bg-background text-on-surface">
      <Sidebar />
      <main className="p-lg grid grid-cols-12 gap-sm">
        <div className="col-span-8 space-y-sm">
          <CustomerForm />
          <ProductTable />
          <ShippingMethod />
        </div>
        <div className="col-span-4 space-y-sm">
          <OrderSummary />
          <StockStatus />
          <MapPreview />
        </div>
      </main>
    </div>
  );
}
