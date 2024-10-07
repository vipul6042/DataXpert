import React from 'react';

const ConversionRateCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-80">
      <h2 className="text-lg font-semibold text-gray-700">Conversion Rate</h2>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-4xl font-bold text-black">23.87%</h1>
        <p className="text-red-500 text-lg font-medium">↓ 1.23%</p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Product Views</p>
            <p className="text-sm text-gray-500">2341 sessions</p>
          </div>
          <div className="text-right">
            <p className="text-green-500">↑ 10.74%</p>
            <p className="text-gray-600">87.23%</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Added to Cart</p>
            <p className="text-sm text-gray-500">1253 sessions</p>
          </div>
          <div className="text-right">
            <p className="text-red-500">↓ 3.33%</p>
            <p className="text-gray-600">47.87%</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Reached Checkout</p>
            <p className="text-sm text-gray-500">208 sessions</p>
          </div>
          <div className="text-right">
            <p className="text-green-500">↑ 5.44%</p>
            <p className="text-gray-600">23.95%</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Sessions Converted</p>
            <p className="text-sm text-gray-500">258 sessions</p>
          </div>
          <div className="text-right">
            <p className="text-green-500">↑ 3.34%</p>
            <p className="text-gray-600">18.14%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionRateCard;
