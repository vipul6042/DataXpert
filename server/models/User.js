const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password_hash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		google_login: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		other_social_login: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		two_factor_enabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		two_factor_secret: {
			type: DataTypes.STRING,
		},
		password_reset_token: {
			type: DataTypes.STRING,
		},
		password_reset_expires: {
			type: DataTypes.DATE,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = User;
