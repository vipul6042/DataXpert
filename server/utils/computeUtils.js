// Utility function to simulate delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function for computing year-over-year changes
const computeYearlyChanges = (financialData) => {
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
const computeComparisons = (companyFinancials, competitors) => {
	const comparisons = {
		higher_stock_price: 0,
		higher_market_share: 0,
		higher_revenue: 0,
		higher_expenses: 0,
	};

	for (const competitor of competitors) {
		if (competitor.stock_price > companyFinancials.stock_price) {
			comparisons.higher_stock_price++;
		}
		if (competitor.market_share > companyFinancials.market_share) {
			comparisons.higher_market_share++;
		}
		if (competitor.revenue > companyFinancials.revenue) {
			comparisons.higher_revenue++;
		}
		if (competitor.expenses > companyFinancials.expenses) {
			comparisons.higher_expenses++;
		}
	}

	return comparisons;
};
