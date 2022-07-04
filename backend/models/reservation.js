'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}

    
    
    // static associate({ User, Post }) {
    //   this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    //   this.belongsTo(Post, { foreignKey: 'postId', as: 'post' })
    // }
  }
  Reservation.init({
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    amount_res: DataTypes.DOUBLE,
    payement_mode: DataTypes.STRING,
    latitude_start: DataTypes.FLOAT,
    longitude_start: DataTypes.FLOAT,
   
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};