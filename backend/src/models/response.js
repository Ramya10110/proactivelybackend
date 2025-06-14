module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    formId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    values: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} }
  });

  return Response;
};
