const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Post extends Model {}

// Sequelize will create this table if it doesn't exist on startup
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
        // foreign key column is set via associations in index.js
    },
    {
        sequelize: sequelizeInstance,
        modelName: "posts", // use lowercase plural format
        timestamps: true,
        freezeTableName: true,
    }
);

module.exports = Post;
