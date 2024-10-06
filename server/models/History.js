import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const History = sequelize.define(
	"History",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		sl_no: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		company_detail: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		computation_result: {
			type: DataTypes.JSON,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: "History",
		timestamps: true,
	},
);

export default History;
