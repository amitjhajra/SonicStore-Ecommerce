import Product from "../models/Product.js";

// @desc   Get all products (supports optional search & category filter)
// @route  GET /api/products?keyword=sony&category=Headphones
// @access Public
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } } // case-insensitive search
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const products = await Product.find({ ...keyword, ...category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get a single product by its id
// @route  GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Product not found" });
  }
};

// @desc   Get list of distinct categories (for filter buttons on the UI)
// @route  GET /api/products/categories/all
// @access Public
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, brand, countInStock } =
      req.body;
    let imageUrl = "";

    if (req.file) {
      // Convert buffer to Base64 to send to Cloudinary safely from memory
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "sonicstore",
      });
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: "Image file is required" });
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      brand,
      countInStock,
      image: imageUrl,
      rating: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProducts, getProductById, getCategories ,deleteProduct,createProduct};
