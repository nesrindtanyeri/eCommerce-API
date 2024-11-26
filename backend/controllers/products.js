// controllers/products.js
import Product from '../models/Product.js';

// Tüm ürünleri getir
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu.', error });
  }
};

// Belirli bir ürünü ID ile getir
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı.' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu.', error });
  }
};

// Yeni ürün oluştur
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const newProduct = await Product.create({ name, description, price, categoryId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Ürün oluşturulurken hata oluştu.', error });
  }
};

// Ürünü güncelle
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı.' });
    }
    const { name, description, price, categoryId } = req.body;
    await product.update({ name, description, price, categoryId });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Ürün güncellenirken hata oluştu.', error });
  }
};

// Ürünü sil
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı.' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Ürün başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Ürün silinirken hata oluştu.', error });
  }
};
