import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "bg-sonic text-white" : "bg-white text-gray-700 hover:bg-gray-50";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-4">Admin Dashboard</h2>
        <Link to="/admin/products" className={`px-4 py-3 rounded-xl font-medium transition-colors ${isActive('/admin/products')}`}>
          Manage Products
        </Link>
        <Link to="/admin/add-product" className={`px-4 py-3 rounded-xl font-medium transition-colors ${isActive('/admin/add-product')}`}>
          Add New Product
        </Link>
        <Link to="/admin/orders" className={`px-4 py-3 rounded-xl font-medium transition-colors ${isActive('/admin/orders')}`}>
          Manage Orders
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;