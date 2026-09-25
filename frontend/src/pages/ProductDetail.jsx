import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    API.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="text-center py-20 text-gray-500">Loading product...</p>;
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // little confirmation flash
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="text-sonic mb-6 hover:underline">
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
        </div>

        <div>
          <span className="text-sm font-semibold text-sonic uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-800 mt-1">{product.name}</h1>
          <p className="text-yellow-500 mt-2">★ {product.rating} rating</p>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          <div className="text-3xl font-extrabold text-gray-900 mt-6">₹{product.price}</div>

          <p className={`mt-2 text-sm ${product.countInStock > 0 ? "text-green-600" : "text-red-500"}`}>
            {product.countInStock > 0 ? `${product.countInStock} in stock` : "Out of stock"}
          </p>

          {/* Quantity selector */}
          <div className="flex items-center gap-3 mt-6">
            <span className="text-gray-700">Qty:</span>
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 font-bold"
            >
              -
            </button>
            <span className="w-6 text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(product.countInStock, q + 1))}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="mt-6 w-full md:w-auto px-8 py-3 rounded-xl bg-sonic hover:bg-sonic-dark text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {added ? "Added! ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
