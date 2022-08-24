'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
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
          msg:"Title required"
        },
        notEmpty:{
          msg:"Enter Title"
        },
      }
    },
    
    
    
    description: {
       type: DataTypes.TEXT,
       allowNull: false,
      validate: {
        notNull: {
          msg: "A description is required."
        },
        notEmpty: {
          msg: "Please provide a description."
        }
      }
    },


    estimatedTime:  {
        type: DataTypes.STRING,
      },



    materialsNeeded: {
        type:DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return Course;
};