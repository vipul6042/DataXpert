// Utility function to simulate delay
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function for computing year-over-year changes
export const computeYearlyChanges = (financialData) => {
	const yearlyChanges = {
		stock_price: {},
		market_share: {},
		revenue: {},
		expenses: {},
	};

	for (const entry of financialData) {
		const year = entry.year;
		yearlyChanges.stock_price[year] = entry.stock_price;
		yearlyChanges.market_share[year] = entry.market_share;
		yearlyChanges.revenue[year] = entry.revenue;
		yearlyChanges.expenses[year] = entry.expenses;
	}

	return yearlyChanges;
};

// Helper function to compute how many companies have better financials (domestic and global)
export const computeComparisons = (companyFinancials, competitors) => {
	const comparisons = {
		higher_stock_price: {},
		higher_market_share: {},
		higher_revenue: {},
		higher_expenses: {},
	};

	const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

	for (const year of years) {
		comparisons.higher_stock_price[year] = [];
		comparisons.higher_market_share[year] = [];
		comparisons.higher_revenue[year] = [];
		comparisons.higher_expenses[year] = [];

		for (const competitor of competitors) {
			const stockPriceKey = `stock_price_${year}`;
			const marketShareKey = `market_share_${year}`;
			const revenueKey = `revenue_${year}`;
			const expensesKey = `expense_${year}`;

			// For Stock Price
			if (competitor[stockPriceKey] > companyFinancials.stock_price[year]) {
				comparisons.higher_stock_price[year].push({
					sl_no: competitor.sl_no,
					company: competitor.company,
					value: competitor[stockPriceKey],
				});
			}

			// For Market Share
			if (competitor[marketShareKey] > companyFinancials.market_share[year]) {
				comparisons.higher_market_share[year].push({
					sl_no: competitor.sl_no,
					company: competitor.company,
					value: competitor[marketShareKey],
				});
			}

			// For Revenue
			if (competitor[revenueKey] > companyFinancials.revenue[year]) {
				comparisons.higher_revenue[year].push({
					sl_no: competitor.sl_no,
					company: competitor.company,
					value: competitor[revenueKey],
				});
			}

			// For Expenses
			if (competitor[expensesKey] > companyFinancials.expenses[year]) {
				comparisons.higher_expenses[year].push({
					sl_no: competitor.sl_no,
					company: competitor.company,
					value: competitor[expensesKey],
				});
			}
		}
	}

	return comparisons;
};
