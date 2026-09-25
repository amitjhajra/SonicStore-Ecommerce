import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-4">✅</p>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
      <p className="text-gray-500 mb-6">
        Thanks for shopping with SonicStore. Your order has been received.
      </p>

      {order && (
        <div className="bg-white rounded-xl shadow-sm p-5 text-left mb-6">
          <p className="text-sm text-gray-500">
            Order ID: <span className="font-mono text-gray-700">{order._id}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Total: <span className="font-semibold text-gray-800">₹{order.totalPrice}</span>
          </p>
        </div>
      )}

      <Link
        to="/"
        className="inline-block bg-sonic hover:bg-sonic-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
