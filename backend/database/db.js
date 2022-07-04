const env = require("./env.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



//Models
db.user = require("../models/user.js")(sequelize, Sequelize);
db.statut = require("../models/statut.js")(sequelize, Sequelize);
db.mark = require("../models/mark.js")(sequelize, Sequelize);
db.carmodel = require("../models/carmodel.js")(sequelize, Sequelize);
db.car = require("../models/car.js")(sequelize, Sequelize);
db.history = require("../models/history.js")(sequelize, Sequelize);
db.reservation = require("../models/reservation.js")(sequelize, Sequelize);

db.reservation.hasMany(db.history);
db.history.belongsTo(db.reservation,{as: 'reservations', foreignKey:'ReservationId'});

db.car.hasMany(db.reservation);
db.reservation.belongsTo(db.car,{as: 'cars',foreignKey: 'CarId'});


db.history.belongsTo(db.statut,{as: 'statuts', foreignKey:'id_statut'});
db.statut.hasMany(db.history);

db.user.hasMany(db.reservation);
db.reservation.belongsTo(db.user,{as: 'users', foreignKey:'UserId'});

db.carmodel.belongsTo(db.mark,{as: 'marks', foreignKey: 'MarkId'});
db.mark.hasMany(db.carmodel);

db.carmodel.hasMany(db.car);
db.car.belongsTo(db.carmodel,{as: 'carmodels', foreignKey: 'CarModelId'});

db.car.belongsTo(db.user,{as: 'users', foreignKey: 'UserId'});
db.car.belongsTo(db.user);

db.sequelize.sync({}).then(() => {
    console.log("Drop and Resync with {force:true}");
});


module.exports = db;
