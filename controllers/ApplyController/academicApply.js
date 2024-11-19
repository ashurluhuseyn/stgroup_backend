const AcademicApply = require('../../models/ApplyModel/academicApply');
const Course = require('../../models/CourseModel/course');

exports.createAcademicApply = async (req, res) => {
  const { firstname, lastname, email, phone, description, courseID } = req.body;

  try {
    const newApply = await AcademicApply.create({
      firstname,
      lastname,
      email,
      phone,
      description,
      courseID
    });

    res.status(201).json({
      message: 'Müraciət uğurla yaradıldı',
      apply: newApply
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Müraciət yaradılarkən səhv baş verdi' });
  }
};

exports.updateApplyStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const apply = await AcademicApply.findByPk(id);

    if (!apply) {
      return res.status(404).json({ message: 'Müraciət tapılmadı' });
    }

    apply.status = status;
    await apply.save();

    res.json({
      message: 'Status uğurla yeniləndi',
      apply
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Status yenilənərkən səhv baş verdi' });
  }
};

exports.getAllApplies = async (req, res) => {
    try {
      const applies = await AcademicApply.findAll({
        include: {
          model: Course,
          as: 'course',
          attributes: ['title'],
        },
        order: [['createdAt', 'DESC']],
      });
  
      res.json(applies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Müraciətləri əldə edərkən səhv baş verdi' });
    }
  };
  