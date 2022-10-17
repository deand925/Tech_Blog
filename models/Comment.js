const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text_content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                max: 500,
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
)

module.exports = Comment;