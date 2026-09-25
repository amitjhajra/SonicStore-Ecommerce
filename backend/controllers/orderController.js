import Order from "../models/Order.js";

// @desc   Create a new order (simulated checkout - no real payment)
// @route  POST /api/orders
// @access Private (needs token)
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id, // comes from the "protect" middleware
      orderItems,
      shippingAddress,
      totalPrice,
      isPaid: true, // simulated payment - marked as paid immediately
      paidAt: Date.now(),
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get logged-in user's own orders
// @route  GET /api/orders/myorders
// @access Private (needs token)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createOrder, getMyOrders };
