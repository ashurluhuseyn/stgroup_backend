const fs = require('fs')
const path = require('path');
const Category = require('../models/category');
const Service = require('../models/service');
const { Op } = require('sequelize');

const createService = async (req, res) => {
  try {
    const { title, description,description2, categoryID } = req.body;
    const image = req.file ? req.file.filename : null;

    const newService = await Service.create({
      title,
      description,
      description2,
      image, 
      categoryID
    });

    res.status(201).json({ message: 'Service created successfully', data: newService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating service', error });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!services.length) {
      return res.status(404).json({ message: 'No services found' });
    }

    res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving services', error });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving service', error });
  }
};

const getServiceDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'title'], 
      },
    });

    console.log(service);
    

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const relatedServices = await Service.findAll({
      where: {
        categoryID: service.category.id,
        id: { [Op.ne]: id },
      },
      attributes: ['id', 'title', 'description'],
    });

    res.status(200).json({
      service,
      relatedServices,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving service details', error });
  }
};

const getServicesByCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;

    const services = await Service.findAll({ where: { categoryID } });

    if (!service.length) {
      return res.status(404).json({ message: 'No services found for this category' });
    }

    res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving services by category', error });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, description2, categoryID } = req.body;
    const image = req.file ? req.file.filename : null;

    const serviceToUpdate = await Service.findByPk(id);

    if (!serviceToUpdate) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (image && serviceToUpdate.image) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', 'services', serviceToUpdate.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedData = {
      title: title || serviceToUpdate.title,
      description: description || serviceToUpdate.description,
      description2: description2 || serviceToUpdate.description2,
      image: image || serviceToUpdate.image,
      categoryID: categoryID || serviceToUpdate.categoryID,
      updateDate: new Date()
    };

    await Service.update(updatedData, { where: { id } });

    const updatedService = await Service.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    res.status(200).json({ message: 'Service updated successfully', data: updatedService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating service', error });
  }
};

const deleteService = async (req, res) => {
    try {
      const { id } = req.params;
  
      const serviceToDelete = await Service.findByPk(id);
  
      if (!serviceToDelete) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      const imagePath = path.join(__dirname, '..', 'uploads', 'services', serviceToDelete.image);
  
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await Service.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting service', error });
    }
};

module.exports = { createService, getAllServices, getServiceById, getServiceDetails, getServicesByCategory, updateService, deleteService };