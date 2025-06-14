module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    name: { type: DataTypes.STRING, allowNull: false },
    fields: { type: DataTypes.JSONB, allowNull: false }, // [{name, label, type, options}]
    inviteCode: { type: DataTypes.STRING, unique: true, allowNull: false }
  });

  return Form;
};
