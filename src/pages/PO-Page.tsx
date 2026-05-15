import Actions from "../components/client/PO/Action";
import RecentHistory from "../components/client/PO/History";
import POImage from "../components/client/PO/Image";
import LocationSelector from "../components/client/PO/Location-Selector";
import ProList from "../components/client/PO/ProductList";
import SupplierForm from "../components/client/PO/ProviderForm";
import POStatus from "../components/client/PO/Status";
import Topbar from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";

const InboundPage = () => {
  return (
    <div className="text-on-surface">
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-lg">
              <h1 className="text-h2 text-primary">Ghi nhận Lô hàng Mới</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
              {/* LEFT */}
              <div className="lg:col-span-8 space-y-md">
                <SupplierForm />
                <ProList />
                <LocationSelector />
                <Actions />
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-4 space-y-lg">
                <RecentHistory />
                <POStatus />
                <POImage />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InboundPage;
