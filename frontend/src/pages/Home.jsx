import { useState, useEffect } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the list of categories once, for the filter buttons
  useEffect(() => {
    API.get("/products/categories/all").then(({ data }) => setCategories(data));
  }, []);

  // Fetch products whenever the category filter or search keyword changes
  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== "All") params.category = activeCategory;
    if (keyword) params.keyword = keyword;

    API.get("/products", { params })
      .then(({ data }) => setProducts(data))
      .finally(() => setLoading(false));
  }, [activeCategory, keyword]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-sonic to-sonic-dark rounded-3xl text-white px-8 py-12 mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Hear Every Detail 🎧</h1>
        <p className="text-white/80">Premium headphones, earbuds & speakers — at prices that don't hurt.</p>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for headphones, speakers..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sonic"
      />

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-sonic text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
