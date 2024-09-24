const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Company = require("./Company");

const CompanyMetrics = sequelize.define(
	"CompanyMetrics",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		company_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Company,
			},
		},
		year: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		stock_price: {
			type: DataTypes.DECIMAL(12, 2),
		},
		market_share: {
			type: DataTypes.DECIMAL(5, 2),
		},
		revenue: {
			type: DataTypes.DECIMAL(20, 2),
		},
		expense: {
			type: DataTypes.DECIMAL(20, 2),
		},
	},
	{
		timestamps: true,
	},
);

module.exports = CompanyMetrics;
