// controllers/categories.js
import Category from '../models/Category.js';

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error });
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the category.', error });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }
    const { name } = req.body;
    await category.update({ name });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the category.', error });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }
    await category.destroy();
    res.status(200).json({ message: 'Category successfully deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the category.', error });
  }
};

