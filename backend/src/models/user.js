const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'user'), allowNull: false }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
