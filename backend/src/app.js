const express = require('express');
const cors = require('cors');
const db = require('./models');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const formRoutes = require('./routes/formRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/forms', formRoutes);

// DB sync
db.sequelize.sync();

module.exports = app;
