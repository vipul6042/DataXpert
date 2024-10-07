"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Chart from "@/components/graph";
import Card from "@/components/singlecard";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import CompanyCard from "@/components/companyCard";
import ConversionRateCard from "@/components/comparisionCard";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
interface CompanyData {
  company: string;
  country: string;
  country_code: string;
  market_cap: number;
  diversity: string;
}

interface Metrics {
  total_companies_in_country: number;
  greater_diversity_companies_in_country: number;
  yearly_changes: object; // You can refine this based on your structure
  domestic_comparisons: object;
  global_comparisons: object;
}

interface ApiResponse {
  status: string;
  message: string;
  company: CompanyData;
  metrics: Metrics;
}

const CompanyDashboard = () => {
  const { user_id, sl_no } = useParams();

  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const formattedMarketCap = (amount: number) => {
    if (amount > 1e9) {
      return (amount / 1e9).toFixed(2) + "B"; // Formats to billion with 2 decimal places
    }
    return (amount / 1e6).toFixed(2) + "M"; // Formats to million with 2 decimal places
  };
  useEffect(() => {
    if (user_id && sl_no) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/compute-metrics?user_id=${user_id}&sl_no=${sl_no}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch company data");
          }
          const data: ApiResponse = await response.json();

          setCompanyData(data.company);
          setMetrics(data.metrics);
          setStatus(data.status);
          setMessage(data.message);
        } catch (error) {
          console.error(error);
          setCompanyData(null);
        }
      };

      fetchData();
    }
  }, [sl_no]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        {!companyData ? (
          <p>Loading...</p>
        ) : (
          <div className="scroll-auto h-dvh overflow-auto w-dvw p-4">
			<div className="flex flex-row">
			<div className="flex flex-col">
            <CompanyCard
              logourl={`https://ui-avatars.com/api/?name=${companyData.company}&size=200&background=random&color=random`}
              companyName={companyData.company}
              country={companyData.country}
            />
            <div className="flex flex-row">
              <Card
                IconComponent={PriceChangeIcon}
                Item={"Market Cap"}
                value={"$"+formattedMarketCap(companyData.market_cap)}
              />
              <Card
                IconComponent={Diversity3OutlinedIcon}
                Item={"Diversity"}
                value={companyData.diversity}
              />
            </div>
			</div>
            <ConversionRateCard />
			</div>
            {metrics && (
              <>
                <h2 className="text-3xl font-serif font-bold">Metrics</h2>
				<Card IconComponent={MilitaryTechIcon} Item={"Companies in Country"} value={metrics.total_companies_in_country}/>
				<Card IconComponent={MilitaryTechIcon} Item={"Diversity Rank(domestic)"} value={metrics.greater_diversity_companies_in_country}/>
                

                {/* Yearly Changes */}
                {metrics.yearly_changes && (
                  <>
                    <h3>Yearly Changes</h3>
                    <ul>
                      {Object.entries(metrics.yearly_changes).map(
                        ([category, yearData]) => (
                          <li key={category}>
                            <strong>
                              {category.replace(/_/g, " ").toUpperCase()}:
                            </strong>
                            <ul>
                              <Chart data={yearData} />
                            </ul>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}

                {/* Domestic Comparisons */}
                {metrics.domestic_comparisons && (
                  <>
                    <h3>Domestic Comparisons</h3>
                    <ul>
                      {Object.entries(metrics.domestic_comparisons).map(
                        ([comparisonType, yearData]) => (
                          <li key={comparisonType}>
                            <strong>
                              {comparisonType.replace(/_/g, " ")}:
                            </strong>
                            <ul>
                              <Chart data={yearData} />
                            </ul>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}

                {/* Global Comparisons */}
                {metrics.global_comparisons && (
                  <>
                    <h3>Global Comparisons</h3>
                    <ul>
                      {Object.entries(metrics.global_comparisons).map(
                        ([comparisonType, yearData]) => (
                          <li key={comparisonType}>
                            <strong>
                              {comparisonType.replace(/_/g, " ")}:
                            </strong>
                            <ul>
                              <Chart data={yearData} />
                            </ul>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
