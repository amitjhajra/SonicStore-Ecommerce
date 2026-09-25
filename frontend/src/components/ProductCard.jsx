import { Link } from "react-router-dom";

// A single product tile shown on the Home page grid.
// Keeps only the display logic - "Add to Cart" happens on the detail page.
const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden group"
    >
      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-sonic uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="font-semibold text-gray-800 mt-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          <span className="text-sm text-yellow-500">★ {product.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
