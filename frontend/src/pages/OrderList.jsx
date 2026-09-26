import { useState, useEffect } from "react";
import API from "../api/axios"; // Updated import path

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await API.get("/orders/all");
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await API.put(`/orders/${id}/cancel`);
        fetchOrders();
      } catch (err) {
        alert("Failed to cancel order");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 border-b">
              <th className="p-4 rounded-tl-lg">ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 text-xs font-mono text-gray-500">{order._id.substring(0, 8)}</td>
                <td className="p-4 font-medium text-gray-800">{order.user ? order.user.name : "Deleted User"}</td>
                <td className="p-4 text-gray-600">₹{order.totalPrice}</td>
                <td className="p-4">
                  {order.isCancelled ? (
                    <span className="text-red-500 font-semibold text-sm bg-red-50 px-2 py-1 rounded">Cancelled</span>
                  ) : (
                    <span className="text-green-500 font-semibold text-sm bg-green-50 px-2 py-1 rounded">Paid</span>
                  )}
                </td>
                <td className="p-4">
                  {!order.isCancelled && (
                    <button onClick={() => handleCancel(order._id)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 text-sm font-semibold transition-colors">
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;