const Sequelize = require('sequelize');

let sequelize = null;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize('cars_db', 'root', 'Admin123$#', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3315,
    dialectOptions: {
      multipleStatements: true
    }
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.car = require('../models/Car.js')(sequelize, Sequelize);
db.make = require('../models/Make.js')(sequelize, Sequelize);
db.model = require('../models/Model.js')(sequelize, Sequelize);
db.user = require('../models/User.js')(sequelize, Sequelize);
db.schedule = require('../models/Schedule.js')(sequelize, Sequelize);
db.image = require('../models/Image.js')(sequelize, Sequelize);



db.make.hasMany(db.model, { onUpdate: 'CASCADE', onDelete: 'CASCADE', hooks: true });
db.make.hasMany(db.car, { onUpdate: 'CASCADE', onDelete: 'CASCADE', hooks: true });
db.model.hasMany(db.car, { onUpdate: 'CASCADE', onDelete: 'CASCADE', hooks: true });
db.user.hasMany(db.car, { onUpdate: 'CASCADE', onDelete: 'CASCADE', hooks: true });
db.car.hasMany(db.schedule, { onUpdate: 'CASCADE', onDelete: 'CASCADE', hooks: true });

db.model.belongsTo(db.make, { foreignKey: { name: 'carMakeId' } });
db.car.belongsTo(db.make, { foreignKey: { name: 'carMakeId' } });
db.car.belongsTo(db.model), { foreignKey: { name: 'carModelId' } };
db.car.belongsTo(db.user, { foreignKey: { name: 'userId' } });
db.schedule.belongsTo(db.car, { foreignKey: { name: 'carId' } });
//db.image.belongsTo(db.car, { foreignKey: { name: 'carVinNum' } });


module.exports = db;