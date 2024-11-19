const fs = require('fs')
const path = require('path');
const Category = require('../models/category');
const Event = require('../models/event');
const { Op } = require('sequelize');

const createEvent = async (req, res) => {
  try {
    const { title, description,description2, categoryID } = req.body;
    const image = req.file ? req.file.filename : null;

    const newEvent = await Event.create({
      title,
      description,
      description2,
      image, 
      categoryID
    });

    res.status(201).json({ message: 'Event created successfully', data: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event', error });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!events.length) {
      return res.status(404).json({ message: 'No events found' });
    }

    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events', error });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving event', error });
  }
};

const getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'title'], 
      },
    });


    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const relatedEvents = await Event.findAll({
      where: {
        categoryID: event.category.id,
        id: { [Op.ne]: id },
      },
      attributes: ['id', 'title', 'description'],
    });

    res.status(200).json({
      event,
      relatedEvents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving event details', error });
  }
};

const getEventsByCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;

    const events = await Event.findAll({ where: { categoryID } });

    if (!events.length) {
      return res.status(404).json({ message: 'No events found for this category' });
    }

    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events by category', error });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, description2, categoryID } = req.body;
    const image = req.file ? req.file.filename : null;

    const eventToUpdate = await Event.findByPk(id);

    if (!eventToUpdate) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (image && eventToUpdate.image) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', 'events', eventToUpdate.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedData = {
      title: title || eventToUpdate.title,
      description: description || eventToUpdate.description,
      description2: description2 || eventToUpdate.description2,
      image: image || eventToUpdate.image,
      categoryID: categoryID || eventToUpdate.categoryID,
      updateDate: new Date()
    };

    await Event.update(updatedData, { where: { id } });

    const updatedEvent = await Event.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    res.status(200).json({ message: 'Event updated successfully', data: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event', error });
  }
};

const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
  
      const eventToDelete = await Event.findByPk(id);
  
      if (!eventToDelete) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      const imagePath = path.join(__dirname, '..', 'uploads', 'events', eventToDelete.image);
  
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await Event.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting event', error });
    }
};

module.exports = { createEvent, getAllEvents, getEventById, getEventDetails, getEventsByCategory, updateEvent, deleteEvent };