import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
const HistoryCard = ({ title, time, amount, date, status, user_Id, sl_no }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);  // Ensure this runs only on the client-side
  }, []);

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString();
  const formattedMarketCap = (amount) => {
    if (amount > 1e9) {
        return (amount / 1e9).toFixed(2) + 'B'; // Formats to billion with 2 decimal places
    }
    return (amount / 1e6).toFixed(2) + 'M'; // Formats to million with 2 decimal places
};

  const handleClick = () => {
    if (isMounted) {
      router.push(`/dashboard/${user_Id}/${sl_no}`);
    }
  };

  return (
    <div 
      onClick={handleClick} 
      className="bg-white rounded-lg shadow-md p-4 w-80 flex justify-between items-center cursor-pointer hover:shadow-lg transition-shadow hover:scale-105 "
    >
      {/* Left side content */}
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-gray-700">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <span className="mr-2">🕒</span> <span>{formattedTime}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <span className="mr-2">💵</span> <span>${formattedMarketCap(amount)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <span className="mr-2">📅</span> <span>{formattedDate}</span>
        </div>
        <div className="mt-4">
          <span className={`bg-orange-500 text-white text-xs px-2 py-1 rounded`}>
            {status}
          </span>
        </div>
      </div>

      {/* Right side image */}
      <div className="ml-4">
        <img src={`https://ui-avatars.com/api/?name=${title}&size=200&background=random&color=random`} alt={title} className="w-24 h-24 object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default HistoryCard;
