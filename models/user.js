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
      this.hasMany(models.Course, {
     as:"user",
     foreignKey:{
      fieldName:"userId",
      allowNull:false
     }

      })
    }
  }
  User.init({
    firstName: {

      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"FirstName required"
        },
        notEmpty:{
          msg:"Fill in First Name"
        },
      }
    },
    
    
    
    lastName: {
    type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last name is required."
          },
          notEmpty: {
            msg: "Fill in  last name."
          }
        }
      },
    emailAddress: {
    type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email you entered is already in use.'
      },
      validate: {
        notNull: {
          msg: "An email is required."
        },
        isEmail: {
          msg: "Please provide a valid email."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "A password is required."
        },
        notEmpty: {
          msg: "Please provide a password."
        }
      },
      set(val) {
        const hashedPassword = bcrypt.hashSync(val, 10);
        this.setDataValue('password', hashedPassword);
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};