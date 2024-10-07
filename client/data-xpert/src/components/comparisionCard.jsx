import React from "react";

const ConversionRateCard = ({ stock, expenses, revenue, marketShare }) => {
  const formattedMarketCap = (amount) => {
    if (amount > 1e9) {
      return "$" + (amount / 1e9).toFixed(2) + "B"; // Formats to billion with 2 decimal places
    }
    return "$" + (amount / 1e6).toFixed(2) + "M"; // Formats to million with 2 decimal places
  };
  const calculateChangeRate = (stock2023, stock2024) => {
    if (!stock2023) {
      return "Stock price in 2023 is zero or not available.";
    }

    const changeRate = ((stock2024 - stock2023) / stock2023) * 100;
    if(changeRate>0) return '↑ '+changeRate.toFixed(2)+'%';
    return '↓ '+changeRate.toFixed(2)*-1+'%';
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-72">
      <h2 className="text-xl font-semibold text-700">Current Stats</h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-600">Stock Price</p>
            <p className="text-sm text-gray-500">
              {formattedMarketCap(stock[2024])}
            </p>
          </div>
          <div className="text-right">
            <p className={calculateChangeRate(stock[2023], stock[2024])[0]=='↑' ? "text-green-500 " : "text-red-500"}>{calculateChangeRate(stock[2023],stock[2024])}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-600">Expenses</p>
            <p className="text-sm text-gray-500">{formattedMarketCap(expenses[2024])}</p>
          </div>
          <div className="text-right">
          <p className={calculateChangeRate(expenses[2023], expenses[2024])[0]=='↑' ? "text-green-500 " : "text-red-500"}>{calculateChangeRate(expenses[2023],expenses[2024])}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-600">Revenue</p>
            <p className="text-sm text-gray-500">{formattedMarketCap(revenue[2024])}</p>
          </div>
          <div className="text-right">
          <p className={calculateChangeRate(revenue[2023], revenue[2024])[0]=='↑' ? "text-green-500 " : "text-red-500"}>{calculateChangeRate(revenue[2023],revenue[2024])}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-600">Market Share</p>
            <p className="text-sm text-gray-500">{marketShare[2024]+'%'}</p>
          </div>
          <div className="text-right">
          <p className={calculateChangeRate(marketShare[2023], marketShare[2024])[0]=='↑' ? "text-green-500 " : "text-red-500"}>{calculateChangeRate(marketShare[2023],marketShare[2024])}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionRateCard;
