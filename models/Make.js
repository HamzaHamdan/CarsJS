module.exports = (sequelize, DataTypes) => {
  const CarMake = sequelize.define('carMake', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    make: {
      type: DataTypes.STRING,
      required: true
    }
  });
  return CarMake;
};