const productsService = require('../services/products.service');

const getProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const products = await productsService.getAllProducts(search);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error in getProduct:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ message: 'Name and price are required fields' });
    }

    const newProduct = await productsService.createProduct({ name, price, category, stock });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productsService.updateProduct(id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found or no valid fields provided' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productsService.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
