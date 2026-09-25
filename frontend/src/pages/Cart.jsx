import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Must be logged in to check out - send to login if not
    navigate(user ? "/checkout" : "/login");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
        <Link to="/" className="text-sonic hover:underline">
          Continue shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-500">₹{item.price}</p>
            </div>

            <select
              value={item.qty}
              onChange={(e) => updateQty(item._id, Number(e.target.value))}
              className="border rounded-lg px-2 py-1"
            >
              {[...Array(10).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>

            <span className="font-semibold w-20 text-right">₹{item.qty * item.price}</span>

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:text-red-700 ml-2"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mt-6 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-700">Total</span>
        <span className="text-2xl font-extrabold text-gray-900">₹{totalPrice}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-6 w-full bg-sonic hover:bg-sonic-dark text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
