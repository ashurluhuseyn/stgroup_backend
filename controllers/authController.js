const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email və şifrə tələb olunur' });
  }
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Bu email artıq istifadə edilir.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        email,
        password: hashedPassword,
        role: role || 'user', 
      });
  
      res.status(201).json({
        message: 'Qeydiyyat uğurla tamamlandı',
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server səhvi baş verdi' });
    }
  };

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Yanlış şifrə' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login uğurludur',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server səhvi baş verdi' });
  }
};

const changeUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;


  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }
    
    user.role = role;
    await user.save();

    res.json({ message: 'Rol dəyişdirildi', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server səhvi baş verdi' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await User.destroy({
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

module.exports = { registerUser ,loginUser, changeUserRole, getUsers, deleteUser };
