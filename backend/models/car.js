'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
          }
  }
  Car.init({
    num_imatriculation: DataTypes.STRING,
    nb_places: DataTypes.STRING,
    price_day: DataTypes.FLOAT,
    price_hour: DataTypes.FLOAT,
    assurance: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    availability: DataTypes.STRING,
    latitude_start: DataTypes.FLOAT,
   
    longitude_start: DataTypes.FLOAT,
   
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Car',
  }
  );
  return Car;
};