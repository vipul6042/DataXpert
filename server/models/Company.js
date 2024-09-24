import { DataTypes } from "sequelize";
import sequelize from "../config/config";

const Company = sequelize.define(
	"Company",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		diversity_score: {
			type: DataTypes.DECIMAL(5, 2),
		},
	},
	{
		timestamps: true,
	},
);

module.exports = Company;
