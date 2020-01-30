module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        }
    });
    return Image;
};