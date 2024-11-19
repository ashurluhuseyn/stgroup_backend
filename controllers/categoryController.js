const Category = require('../models/category');

const createCategory = async (req, res) => {
  const { title } = req.body;
  try {
    const newCategory = await Category.create({
      title
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.status(200).json(allCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving category', error });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({ message: "Record not found" });
    }
    
    if (title !== undefined) category.title = title;
    
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedRows = await Category.destroy({
      where: { id }
    });
    
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };