import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // Updated import path

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "", price: "", description: "", category: "", brand: "", countInStock: ""
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return setError("Please upload an image.");
    
    setLoading(true);
    setError("");

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("price", formData.price);
    submitData.append("description", formData.description);
    submitData.append("category", formData.category);
    submitData.append("brand", formData.brand);
    submitData.append("countInStock", formData.countInStock);
    submitData.append("image", imageFile);

    try {
      await API.post("/products", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input name="name" placeholder="Product Name" required onChange={handleChange} className="w-full p-3 border rounded-xl" />
        <div className="grid grid-cols-2 gap-4">
          <input name="price" type="number" placeholder="Price (₹)" required onChange={handleChange} className="p-3 border rounded-xl" />
          <input name="countInStock" type="number" placeholder="Stock Count" required onChange={handleChange} className="p-3 border rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="category" placeholder="Category (e.g., Headphones)" required onChange={handleChange} className="p-3 border rounded-xl" />
          <input name="brand" placeholder="Brand" required onChange={handleChange} className="p-3 border rounded-xl" />
        </div>
        <textarea name="description" placeholder="Product Description..." required onChange={handleChange} className="w-full p-3 border rounded-xl h-24"></textarea>
        
        <div className="p-4 border-2 border-dashed rounded-xl bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image (Cloudinary)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full text-sm" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-sonic hover:bg-sonic-dark text-white font-bold py-3 rounded-xl disabled:opacity-50">
          {loading ? "Uploading to Cloudinary..." : "Publish Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;