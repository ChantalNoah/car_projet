'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //histories.belongsTo(models.resevations);
      // define association here
    }
  }
  History.init({

  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};