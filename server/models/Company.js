import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Company = sequelize.define(
	"Company",
	{
		sl_no: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: true,
			autoIncrement: true,
		},
		company: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		country_code: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		market_cap: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		diversity: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		stock_price_2015: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		stock_price_2016: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		stock_price_2017: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		stock_price_2018: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		stock_price_2019: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		stock_price_2020: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		stock_price_2021: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		stock_price_2022: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		stock_price_2023: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		stock_price_2024: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		expense_2015: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		expense_2016: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		expense_2017: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		expense_2018: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		expense_2019: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		expense_2020: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		expense_2021: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		expense_2022: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		expense_2023: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		expense_2024: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		revenue_2015: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		revenue_2016: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		revenue_2017: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		revenue_2018: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		revenue_2019: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		revenue_2020: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		revenue_2021: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		revenue_2022: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		revenue_2023: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		revenue_2024: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		market_share_2015: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		market_share_2016: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		market_share_2017: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		market_share_2018: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		market_share_2019: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		market_share_2020: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		market_share_2021: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		market_share_2022: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		market_share_2023: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
		market_share_2024: {
			type: DataTypes.DOUBLE,
			allowNull: true,
		},
	},
	{
		tableName: "Company",
		timestamps: false,
	},
);
