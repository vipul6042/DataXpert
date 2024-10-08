"use client";
import type React from "react";
import { useEffect, useState } from "react";
import HomeCard from "./homeCard";

interface TopProps {
  prop: string;
}
interface Company{
	company:string,
	sl_no:number,
	market_cap:number,
	revenue_2024:number,
	stock_price_2024:number,
	diversity:number
}

export const Top: React.FC<TopProps> = ({ prop }) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  const formattedMarketCap = (company:Company) => {
    let amount = company.revenue_2024;
    if (prop === "market_cap") amount = company.market_cap;
    else if (prop === "stock_price_2024") amount = company.stock_price_2024;
    else if (prop === "diversity") amount = company.diversity;
    if (amount > 1e9) {
      return "$" + (amount / 1e9).toFixed(2) + "B";
    } else if (amount > 1e6) {
      return "$" + (amount / 1e6).toFixed(2) + "M";
    }
    return amount+'';
  };

  const BASE_API = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(`${BASE_API}/api/top/${prop}`);
        const data = await res.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [prop]);

  return (
    <div className="flex flex-wrap justify-evenly my-12">
      {companies.map((company, index) => (
        <HomeCard
          key={index}
          company={company.company}
          price={formattedMarketCap(company)}
          change={company.sl_no}
          logoUrl={`https://ui-avatars.com/api/?name=${company.company}&size=200&background=random&color=random`}
        />
      ))}
    </div>
  );
};
