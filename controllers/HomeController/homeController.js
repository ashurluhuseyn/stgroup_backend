const Course = require('../../models/CourseModel/course');
const Home = require('../../models/Home/home');
const Blog = require('../../models/blog');

const createDataForHome = async (req, res) => {
    try {
        const {
            sectionTitle,
            sectionDescription,
            innerTitle,
            innerDescription,
            option1,
            option2,
            option3,
            option4
        } = req.body;

        const image = req.file ? req.file.filename : null;

        const newData = await Home.create({
            sectionTitle,
            sectionDescription,
            innerTitle,
            innerDescription,
            option1,
            option2,
            option3,
            option4,
            image
        });

        res.status(201).json({ message: 'Data created successfully', data: newData });
    } catch (error) {
        console.error('Error creating data:', error);
        res.status(500).json({ message: 'Error creating data', error });
    }
};

const getAllDataForHome = async (req, res) => {
    try {
        const homeData = await Home.findAll();
        const blogs = await Blog.findAll({ limit: 6 });
        const courses = await Course.findAll({ limit: 6 });

        res.json({ homeData: homeData[0], blogs, courses });
    } catch (error) {
        console.error('Error creating data:', error.message);
        console.error(error.stack);
        res.status(500).json({ message: 'Error creating data', error: error.message });
    }
};

const getDataById = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Home.findByPk(id);

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error.message); 
        console.error(error.stack); 
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
};

const updateDataForHome = async (req, res) => {
    try {
      const { id } = req.params;
  
      const {
        sectionTitle,
        sectionDescription,
        innerTitle,
        innerDescription,
        option1,
        option2,
        option3,
        option4,
      } = req.body;
  
      const image = req.file ? req.file.filename : null;
  
      const dataToUpdate = {
        sectionTitle,
        sectionDescription,
        innerTitle,
        innerDescription,
        option1,
        option2,
        option3,
        option4,
      };
  
      if (image) {
        dataToUpdate.image = image;
      }
      const updatedData = await Home.update(dataToUpdate, {
        where: { id },
      });
  
      if (updatedData[0] === 0) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ message: 'Error updating data', error });
    }
};
  

module.exports = { createDataForHome, getAllDataForHome, getDataById, updateDataForHome };
