module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
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
        image: {
            type: DataTypes.STRING,
        }
    });
    return Image;
};