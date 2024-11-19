const About = require('../models/about');
const Advantage = require('../models/advantage');

const createAbout = async (req, res) => {
  const {
    sectionTitle,
    sectionDescription,
    innerTitle,
    innerDescription,
    address,
    phone1,
    phone2,
    phone3,
    email,
    email2,
  } = req.body;

  try {
    const image = req.file ? req.file.filename : null;

    const newAbout = await About.create({
      sectionTitle,
      sectionDescription,
      innerTitle,
      innerDescription,
      address,
      phone1,
      phone2,
      phone3,
      email,
      email2,
      image,
    });

    res.status(201).json(newAbout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getAbouts = async (req, res) => {
  try {
    const [abouts, advantages] = await Promise.all([
      About.findAll(),
      Advantage.findAll(),
    ]);

    if (!abouts || abouts.length === 0) {
      return res.status(404).json({ message: "No About data found." });
    }

    res.status(200).json({
      about: abouts[0],
      advantages,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params
  try {
      const data = await About.findByPk(id);

      res.json(data);
  } catch (error) {
      console.error('Error fetching data:', error.message); 
      console.error(error.stack); 
      res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

const updateAbout = async (req, res) => {
  const { id } = req.params;
  const {
    sectionTitle,
    sectionDescription,
    innerTitle,
    innerDescription,
    address,
    phone1,
    phone2,
    phone3,
    email,
    email2,
  } = req.body;

  try {
    const about = await About.findByPk(id);
    if (!about) {
      return res.status(404).json({ message: "Record not found" });
    }

    const image = req.file ? req.file.filename : about.image;

    Object.assign(about, {
      sectionTitle,
      sectionDescription,
      innerTitle,
      innerDescription,
      address,
      phone1,
      phone2,
      phone3,
      email,
      email2,
      image,
    });

    await about.save();

    res.status(200).json(about);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};


module.exports = {
  createAbout,
  getAbouts,
  getDataById,
  updateAbout
};
