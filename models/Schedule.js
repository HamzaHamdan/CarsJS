module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('schedule', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            required: true
        },
        date: {
            type: DataTypes.STRING,
            required: true
        },
        notes: {
            type: DataTypes.STRING,
            required: true
        },
        vinNumber: {
            type: DataTypes.STRING,
            required: true
        }
    });
    return Schedule;
};