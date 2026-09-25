import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import API from "../api/axios";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({ address: "", city: "", postalCode: "", country: "" });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);

    try {
      // Build the order payload from the cart context
      const orderItems = cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      }));

      const { data } = await API.post("/orders", {
        orderItems,
        shippingAddress: address,
        totalPrice,
      });

      clearCart();
      navigate("/order-success", { state: { order: data } });
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</div>
      )}

      <form onSubmit={handlePlaceOrder} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-gray-700">Shipping Address</h2>

        <input
          name="address"
          placeholder="Street address"
          value={address.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sonic"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sonic"
          />
          <input
            name="postalCode"
            placeholder="Postal code"
            value={address.postalCode}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sonic"
          />
        </div>
        <input
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sonic"
        />

        <div className="border-t pt-4 flex items-center justify-between">
          <span className="text-gray-600">Order total</span>
          <span className="text-xl font-bold text-gray-900">₹{totalPrice}</span>
        </div>

        <p className="text-xs text-gray-400">
          This is a simulated checkout for demo purposes - no real payment is processed.
        </p>

        <button
          type="submit"
          disabled={placing}
          className="w-full bg-sonic hover:bg-sonic-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {placing ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
