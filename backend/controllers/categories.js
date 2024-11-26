// controllers/categories.js
import Category from '../models/Category.js';

// Tüm kategorileri getir
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu.', error });
  }
};

// Belirli bir kategoriyi ID ile getir
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı.' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu.', error });
  }
};

// Yeni kategori oluştur
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Kategori oluşturulurken hata oluştu.', error });
  }
};

// Kategoriyi güncelle
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı.' });
    }
    const { name } = req.body;
    await category.update({ name });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Kategori güncellenirken hata oluştu.', error });
  }
};

// Kategoriyi sil
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı.' });
    }
    await category.destroy();
    res.status(200).json({ message: 'Kategori başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Kategori silinirken hata oluştu.', error });
  }
};
