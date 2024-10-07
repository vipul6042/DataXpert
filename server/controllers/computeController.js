import { Company } from "../models/Company.js";
import { sequelize } from "../config/db.js";
import { Op } from "sequelize";
import { delay } from "../utils/computeUtils.js";
import { computeYearlyChanges } from "../utils/computeUtils.js";
import { computeComparisons } from "../utils/computeUtils.js";
import redisClient from "redis";
import { User, History } from "../models/associations.js";
import redis from "redis";

const client = redis.createClient();

client.on("error", (err) => {
	console.log("Redis Client Error", err);
});

// (async () => {
// 	await client.connect();
// })();

export const compute = async (req, res) => {
	const { code } = req.params;
	console.log(code);

	try {
		const companies = await Company.findAll({
			where: {
				country_code: code,
			},
		});

		if (companies.length === 0) {
			return res
				.status(404)
				.json({ message: "No companies found for this country code" });
		}

		res.json(companies);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const search = async (req, res) => {
	const { query } = req.query;
	if (query.length < 1) return;
	try {
		const companies = await Company.findAll({
			where: {
				company: {
					[Op.iLike]: `%${query}%`,
				},
			},
		});
		res.json(companies);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getCompanyData = async (req, res) => {
	try {
		const { sl_no } = req.params;

		if (!sl_no) {
			return res
				.status(400)
				.json({ status: "error", message: "sl_no is required" });
		}

		const company = await Company.findByPk(sl_no, {
			attributes: [
				"company",
				"country",
				"country_code",
				"market_cap",
				"diversity",
			],
		});

		res.json({
			status: "success",
			message: "Company selected successfully",
			company,
		});
	} catch (error) {
		console.error("Error selecting company:", error);
		res.status(500).json({ status: "error", message: "Internal server error" });
	}
};

export const getComputeMetrics = async (req, res) => {
	try {
		const { user_id, sl_no } = req.query;

		const sl_no_num = Number.parseFloat(sl_no);
		const user_id_num = Number.parseInt(user_id);

		if (!sl_no) {
			return res
				.status(400)
				.json({ status: "error", message: "sl_no is required" });
		}

		if (Number.isNaN(sl_no_num)) {
			return res.status(400).json({ error: "Invalid sl_no parameter" });
		}

		const historyEntry = await History.findOne({
			where: { sl_no: sl_no_num, user_id: user_id_num },
		});

		if (historyEntry) {
			return res.json({
				status: "success",
				company: historyEntry.company_detail,
				metrics: historyEntry.computation_result,
				source: "history",
			});
		}

		const computationStartTime = Date.now();

		const company = await Company.findByPk(sl_no_num, {
			attributes: [
				"company",
				"country",
				"country_code",
				"market_cap",
				"diversity",
			],
		});

		if (!company) {
			return res
				.status(404)
				.json({ status: "error", message: "Company not found" });
		}

		const companyData = await Company.findOne({
			where: { sl_no: sl_no_num },
			attributes: [
				"stock_price_2015",
				"stock_price_2016",
				"stock_price_2017",
				"stock_price_2018",
				"stock_price_2019",
				"stock_price_2020",
				"stock_price_2021",
				"stock_price_2022",
				"stock_price_2023",
				"stock_price_2024",
				"revenue_2015",
				"revenue_2016",
				"revenue_2017",
				"revenue_2018",
				"revenue_2019",
				"revenue_2020",
				"revenue_2021",
				"revenue_2022",
				"revenue_2023",
				"revenue_2024",
				"expense_2015",
				"expense_2016",
				"expense_2017",
				"expense_2018",
				"expense_2019",
				"expense_2020",
				"expense_2021",
				"expense_2022",
				"expense_2023",
				"expense_2024",
				"market_share_2015",
				"market_share_2016",
				"market_share_2017",
				"market_share_2018",
				"market_share_2019",
				"market_share_2020",
				"market_share_2021",
				"market_share_2022",
				"market_share_2023",
				"market_share_2024",
			],
		});

		const financialData = [];

		const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

		for (const year of years) {
			const stockPriceField = `stock_price_${year}`;
			const revenueField = `revenue_${year}`;
			const expenseField = `expense_${year}`;
			const marketShareField = `market_share_${year}`;

			financialData.push({
				year: year.toString(),
				stock_price: companyData[stockPriceField],
				revenue: companyData[revenueField],
				expenses: companyData[expenseField],
				market_share: companyData[marketShareField],
			});
		}
		const yearlyChanges = computeYearlyChanges(financialData);

		const companiesInSameCountry = await Company.findAll({
			where: { country: company.country },
			attributes: ["sl_no", "company"],
		});

		const companiesInSameCountryList = companiesInSameCountry.map(
			(company) => ({
				sl_no: company.sl_no,
				company_name: company.company,
			}),
		);

		const greaterDiversityCompanies = await Company.findAll({
			where: {
				country: company.country,
				diversity: { [Op.gt]: company.diversity, [Op.ne]: null },
			},
			attributes: ["sl_no", "company", "diversity", "country"],
		});

			 const companiesWithGreaterDiversity = greaterDiversityCompanies.map(
					(company) => ({
						sl_no: company.sl_no,
						company: company.company,
						diversity: company.diversity,
						country: company.country,
					}),
				);

		const competitorsDomestic = await Company.findAll({
			where: {
				country: company.country,
				sl_no: { [Op.ne]: sl_no_num },
			},
			attributes: [
				"sl_no",
				"company",
				"stock_price_2015",
				"stock_price_2016",
				"stock_price_2017",
				"stock_price_2018",
				"stock_price_2019",
				"stock_price_2020",
				"stock_price_2021",
				"stock_price_2022",
				"stock_price_2023",
				"stock_price_2024",
				"market_share_2015",
				"market_share_2016",
				"market_share_2017",
				"market_share_2018",
				"market_share_2019",
				"market_share_2020",
				"market_share_2021",
				"market_share_2022",
				"market_share_2023",
				"market_share_2024",
				"revenue_2015",
				"revenue_2016",
				"revenue_2017",
				"revenue_2018",
				"revenue_2019",
				"revenue_2020",
				"revenue_2021",
				"revenue_2022",
				"revenue_2023",
				"revenue_2024",
				"expense_2015",
				"expense_2016",
				"expense_2017",
				"expense_2018",
				"expense_2019",
				"expense_2020",
				"expense_2021",
				"expense_2022",
				"expense_2023",
				"expense_2024",
			],
		});

		const competitorsGlobal = await Company.findAll({
			where: {
				sl_no: { [Op.ne]: sl_no_num },
			},
			attributes: [
				"sl_no",
				"company",
				"stock_price_2015",
				"stock_price_2016",
				"stock_price_2017",
				"stock_price_2018",
				"stock_price_2019",
				"stock_price_2020",
				"stock_price_2021",
				"stock_price_2022",
				"stock_price_2023",
				"stock_price_2024",
				"market_share_2015",
				"market_share_2016",
				"market_share_2017",
				"market_share_2018",
				"market_share_2019",
				"market_share_2020",
				"market_share_2021",
				"market_share_2022",
				"market_share_2023",
				"market_share_2024",
				"revenue_2015",
				"revenue_2016",
				"revenue_2017",
				"revenue_2018",
				"revenue_2019",
				"revenue_2020",
				"revenue_2021",
				"revenue_2022",
				"revenue_2023",
				"revenue_2024",
				"expense_2015",
				"expense_2016",
				"expense_2017",
				"expense_2018",
				"expense_2019",
				"expense_2020",
				"expense_2021",
				"expense_2022",
				"expense_2023",
				"expense_2024",
			],
		});

		const domesticComparisons = computeComparisons(
			yearlyChanges,
			competitorsDomestic,
		);
		const globalComparisons = computeComparisons(
			yearlyChanges,
			competitorsGlobal,
		);

		const computationEndTime = Date.now();
		const timeTaken = computationEndTime - computationStartTime;

		const minResponseTime = 0;
		const delayTime = Math.max(minResponseTime - timeTaken, 0);

		await delay(delayTime);

		const metrics = {
			total_companies_in_country: companiesInSameCountryList,
			greater_diversity_companies_in_country: companiesWithGreaterDiversity,
			yearly_changes: yearlyChanges,
			domestic_comparisons: domesticComparisons,
			global_comparisons: globalComparisons,
		};

		await History.create({
			sl_no: sl_no_num,
			user_id: user_id_num,
			company_detail: company,
			computation_result: metrics,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		res.json({
			status: "success",
			company,
			metrics,
			source: "computed",
		});
	} catch (error) {
		console.error("Error computing company metrics:", error);
		res.status(500).json({ status: "error", message: "Internal server error" });
	}
};
