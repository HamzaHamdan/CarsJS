module.exports = (sequelize, DataTypes) => {
    const CarModel = sequelize.define('carModel', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            required: true
        }
    });
    return CarModel;
};