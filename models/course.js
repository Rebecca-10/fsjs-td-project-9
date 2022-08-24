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
      // define association here
      this.belongsTo(models.User, {
     as:"user",
     foreignKey:{
      fieldName:"userId",
      allowNull:false
     }

      })
    }
  }
  User.init({
    title: {

      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"FirstName required"
        },
        notEmpty:{
          msg:"FirstName required"
        },
      }
    },
    
    
    
    description: DataTypes.TEXT,
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};