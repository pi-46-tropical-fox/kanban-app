'use strict';
const {
    Model
} = require('sequelize');
const { hash } = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Task)
        }
    };
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        organization: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate(user, options) {
                let hashed = hash(user.password);
                user.password = hashed;
                if (!user.organization) {
                    user.organization = 'Hacktiv8'
                }
            }
        }
    });
    return User;
};