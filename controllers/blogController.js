const fs = require('fs')
const path = require('path');
const Blog = require('../models/blog');
const Category = require('../models/category');
const { Op } = require('sequelize');

const createBlog = async (req, res) => {
  try {
    const { title, description, categoryID } = req.body;
    const image = req.file ? req.file.filename : null;

    const newBlog = await Blog.create({
      title,
      description,
      image, 
      categoryID
    });

    res.status(201).json({ message: 'Blog created successfully', data: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs found' });
    }

    res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving blogs', error });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving blog', error });
  }
};

const getBlogDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'title'], 
      },
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const relatedBlogs = await Blog.findAll({
      where: {
        categoryID: blog.category.id,
        id: { [Op.ne]: id },
      },
      attributes: ['id', 'title', 'image', 'createDate', 'description'],
    });

    res.status(200).json({
      blog,
      relatedBlogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving blog details', error });
  }
};


const getBlogsByCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;

    const blogs = await Blog.findAll({ where: { categoryID } });

    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs found for this category' });
    }

    res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving blogs by category', error });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryID } = req.body;
    const image = req.file ? req.file.filename : null;

    const blogToUpdate = await Blog.findByPk(id);

    if (!blogToUpdate) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (image && blogToUpdate.image) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', 'blogs', blogToUpdate.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedData = {
      title: title || blogToUpdate.title,
      description: description || blogToUpdate.description,
      image: image || blogToUpdate.image,
      categoryID: categoryID || blogToUpdate.categoryID,
      updateDate: new Date()
    };

    await Blog.update(updatedData, { where: { id } });

    const updatedBlog = await Blog.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    res.status(200).json({ message: 'Blog updated successfully', data: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
  
      const blogToDelete = await Blog.findByPk(id);
  
      if (!blogToDelete) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      const imagePath = path.join(__dirname, '..', 'uploads', 'blogs', blogToDelete.image);
  
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await Blog.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting blog', error });
    }
};

module.exports = { createBlog, getAllBlogs, getBlogById, getBlogDetails, getBlogsByCategory, updateBlog, deleteBlog };