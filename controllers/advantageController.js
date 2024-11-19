const Advantage = require('../models/advantage');

const createAdvantage = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newAdvantage = await Advantage.create({
      title,
      description
    });
    res.status(201).json(newAdvantage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getAdvantages = async (req, res) => {
  try {
    const allAdvantages = await Advantage.findAll();
    res.status(200).json(allAdvantages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getAdvantageById = async (req, res) => {
  const { id } = req.params;
  try {
    const advantage = await Advantage.findByPk(id);
    
    if (!advantage) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(advantage);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const updateAdvantage = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const advantage = await Advantage.findByPk(id);
    
    if (!advantage) {
      return res.status(404).json({ message: "Record not found" });
    }
    
    if (title !== undefined) advantage.title = title;
    if (description !== undefined) advantage.description = description;
    
    await advantage.save();

    res.status(200).json(advantage);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteAdvantage = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedRows = await Advantage.destroy({
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

module.exports = { createAdvantage, getAdvantages, getAdvantageById, updateAdvantage, deleteAdvantage };