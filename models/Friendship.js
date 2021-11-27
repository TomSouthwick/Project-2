const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Friendship extends Model {}

Friendship.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    friend_id1: {
        type: DataTypes.INTEGER,
        references: {
            model: 'client',
            key: 'id',
        },
    },
    friend_id2: {
        type: DataTypes.INTEGER,
        references: {
            model: 'client',
            key: 'id',
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'friendship',
  }
);

module.exports = Friendship;