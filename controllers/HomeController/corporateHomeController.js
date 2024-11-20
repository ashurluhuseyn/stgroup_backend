const Advantage = require("../../models/advantage");
const CorporateHome = require("../../models/Home/corporateHome");
const Service = require("../../models/service");

const createDataForCorporateHome = async (req, res) => {
    try {
      const { sectionTitle, sectionDescription } = req.body;
  
      if (!sectionTitle || !sectionDescription) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
  
      const data = await CorporateHome.create({
        sectionTitle,
        sectionDescription
      });
  
      return res.status(201).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while creating the data.' });
    }
};

const getDataForCorporateHome = async (req, res) => {
    try {
        const homeData = await CorporateHome.findAll();
        const services = await Service.findAll({ limit: 6 });
        const advantages = await Advantage.findAll();

        res.json({ homeData: homeData[0], services, advantages });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        console.error(error.stack);
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
};

const getDataForCoById = async (req, res) => {
    const { id } = req.params
    try {
        const data = await CorporateHome.findByPk(id);

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error.message); 
        console.error(error.stack); 
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
};

const updateDataForCorporateHome = async (req, res) => {
    try {
      const { id } = req.params;
      const { sectionTitle, sectionDescription } = req.body;
  
      const data = await CorporateHome.findByPk(id);
      if (!data) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      await data.update({
        sectionTitle: sectionTitle || data.sectionTitle,
        sectionDescription: sectionDescription || data.sectionDescription
      });
  
      res.status(200).json({ message: 'Data updated successfully', data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating data', error });
    }
};

module.exports = { createDataForCorporateHome, getDataForCorporateHome, getDataForCoById, updateDataForCorporateHome }