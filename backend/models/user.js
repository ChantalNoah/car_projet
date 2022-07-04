'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      //this.belongsToMany(roles, { through: 'users_role' });
    }
  }
  User.init({
    firstname: DataTypes.STRING,
    lastname: {
      allowNull: true,
      type: DataTypes.STRING
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.STRING,
    num_cni: {
      type: DataTypes.STRING,
      unique: {msg: "My Message"}
    },
    country: DataTypes.STRING,
    role: {
      allowNull : false,
      type : DataTypes.STRING
    },  
  }, {
    sequelize,
    modelName: 'User',
    indexes: [{
      fields: ['num_cni'],
      fields: ['number'],
      fields: ['email'],
      unique: true
    }]
  });
  return User;
};