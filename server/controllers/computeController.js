import { Company } from "../models/Company.js";
import { sequelize } from "../config/db.js";
import { Op } from "sequelize";

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

// router.get("/country/:code", async (req, res) => {
// 	const { code } = req.params;

// 	try {
// 		// Fetch all companies with the specified country code
// 		const companies = await Company.findAll({
// 			where: {
// 				countryCode: code,
// 			},
// 		});

// 		if (companies.length === 0) {
// 			return res
// 				.status(404)
// 				.json({ message: "No companies found for this country code" });
// 		}

// 		res.json(companies);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// });

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

// Company Metrics API (Refined)
router.post("/compute-metrics", async (req, res) => {
	try {
		const { company_id } = req.body;

		if (!company_id) {
			return res
				.status(400)
				.json({ status: "error", message: "Company ID is required" });
		}


		const computationStartTime = Date.now();


		const company = await Company.findByPk(company_id, {
			attributes: ["company_id", "company_name", "company_code", "country"],
		});

		if (!company) {
			return res
				.status(404)
				.json({ status: "error", message: "Company not found" });
		}


		const financialData = await FinancialData.findAll({
			where: { company_id },
			attributes: [
				"year",
				"stock_price",
				"market_share",
				"revenue",
				"expenses",
			],
		});

		const yearlyChanges = computeYearlyChanges(financialData);


		const companiesInSameCountry = await Company.count({
			where: { country: company.country },
		});


		const greaterDiversityCompanies = await Company.count({
			where: {
				country: company.country,
				diversity_score: { $gt: company.diversity_score },
			},
		});


		const competitorsDomestic = await Company.findAll({
			where: {
				country: company.country,
				company_id: { $ne: company_id },
			},
			attributes: ["stock_price", "market_share", "revenue", "expenses"],
		});

		const competitorsGlobal = await FinancialData.findAll({
			where: {
				company_id: { $ne: company_id },
			},
			attributes: ["stock_price", "market_share", "revenue", "expenses"],
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


		const minResponseTime = 120000;
		const delayTime = Math.max(minResponseTime - timeTaken, 0);


		await delay(delayTime);


		const metrics = {
			total_companies_in_country: companiesInSameCountry,
			greater_diversity_companies_in_country: greaterDiversityCompanies,
			yearly_changes: yearlyChanges,
			domestic_comparisons: domesticComparisons,
			global_comparisons: globalComparisons,
		};


		res.json({
			status: "success",
			company,
			metrics,
		});
	} catch (error) {
		console.error("Error computing company metrics:", error);
		res.status(500).json({ status: "error", message: "Internal server error" });
	}
});
