module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('car', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    carVinNum: {
      type: DataTypes.STRING,
      required: true
    },
    carYear: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carColor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carMilage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carPrice: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Car;
};