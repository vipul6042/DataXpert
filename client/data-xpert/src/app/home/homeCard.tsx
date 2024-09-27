import React from "react";
import CardActionArea from "@mui/material/CardActionArea";
interface HomeCardProps {
  company: string;
  price: number;
  change: number;
  logoUrl: string;
}

const HomeCard: React.FC<HomeCardProps> = ({
  company,
  price,
  change,
  logoUrl,
}) => {
  const isNegative = change < 0;

  return (
    <div className="border rounded-lg  w-40 text-center shadow-md m-5">
      <CardActionArea className="p-4">
        <div className="mb-2">
          <img
            src={logoUrl}
            alt={`${company} logo`}
            className="w-10 h-10 mx-auto"
          />
        </div>
        <div className="text-lg font-semibold">{company}</div>
        <div className="text-xl font-bold mt-2">₹{price.toFixed(2)}</div>
        <div
          className={`text-sm mt-1 ${
            isNegative ? "text-red-600" : "text-green-600"
          }`}
        >
          {isNegative ? "" : "+"}
          {change.toFixed(2)} ({((change / price) * 100).toFixed(2)}%)
        </div>
      </CardActionArea>
    </div>
  );
};

export default HomeCard;
