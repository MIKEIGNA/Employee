// server/controllers/userController.js
const loginUser = async (req, res) => {
  const { accountNumber, password } = req.body;

  try {
    const user = await User.findOne({ where: { accountNumber } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, role: user.role }, // Include the role in the token
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ message: 'Login successful', token, role: user.role });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
