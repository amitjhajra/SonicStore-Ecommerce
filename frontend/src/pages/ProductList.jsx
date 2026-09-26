import { useState, useEffect } from "react";
import API from "../api/axios"; // Updated import path

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts(); 
      } catch (err) {
        alert("Error deleting product");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 border-b">
              <th className="p-4 rounded-tl-lg">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 text-xs font-mono text-gray-500">{product._id.substring(0, 8)}...</td>
                <td className="p-4 font-medium text-gray-800">{product.name}</td>
                <td className="p-4 text-gray-600">₹{product.price}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(product._id)} className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm font-semibold transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;