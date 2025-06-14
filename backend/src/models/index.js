const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Form = require('./form')(sequelize, Sequelize);
db.Response = require('./response')(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Form, { as: 'forms', foreignKey: 'adminId' });
db.Form.belongsTo(db.User, { as: 'admin', foreignKey: 'adminId' });

db.Form.hasOne(db.Response, { as: 'response', foreignKey: 'formId' });
db.Response.belongsTo(db.Form, { as: 'form', foreignKey: 'formId' });

module.exports = db;
