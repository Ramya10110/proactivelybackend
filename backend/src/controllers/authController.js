const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!['admin', 'user'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const user = await db.User.create({ username, password, role });
    res.json({ message: 'Registered', user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await user.validPassword(password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
};
