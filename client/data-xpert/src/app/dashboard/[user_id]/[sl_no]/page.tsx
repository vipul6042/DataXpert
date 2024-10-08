"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Chart from "@/components/graph";
import Card from "@/components/singlecard";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import CompanyCard from "@/components/companyCard";
import ConversionRateCard from "@/components/comparisionCard";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

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
  const [activeTab, setActiveTab] = useState("yearlyChanges");

  const renderContent = () => {
    switch (activeTab) {
      case "yearlyChanges":
        return (
          <div>
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
          </div>
        );
      case "domesticComparison":
        return (
          <div>
            {metrics.domestic_comparisons && (
              <>
                <h3>Domestic Comparisons</h3>
                <ul>
                  {Object.entries(metrics.domestic_comparisons).map(
                    ([comparisonType, yearData]) => (
                      <li key={comparisonType}>
                        <strong>{comparisonType.replace(/_/g, " ")}:</strong>
                        <ul>
                          <Chart data={yearData} />
                        </ul>
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
          </div>
        );
      case "globalComparison":
        return (
          <div>
            {metrics.global_comparisons && (
              <>
                <h3>Global Comparisons</h3>
                <ul>
                  {Object.entries(metrics.global_comparisons).map(
                    ([comparisonType, yearData]) => (
                      <li key={comparisonType}>
                        <strong>{comparisonType.replace(/_/g, " ")}:</strong>
                        <ul>
                          <Chart data={yearData} />
                        </ul>
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };
 const BASE_API = process.env.NEXT_PUBLIC_API;
  const formattedMarketCap = (amount: number) => {
    if (amount > 1e9) {
      return "$" + (amount / 1e9).toFixed(2) + "B"; // Formats to billion with 2 decimal places
    }
    return "$" + (amount / 1e6).toFixed(2) + "M"; // Formats to million with 2 decimal places
  };
  useEffect(() => {
    if (user_id && sl_no) {
      const fetchData = async () => {
        try {
          const response = await fetch(
											`${BASE_API}/api/compute-metrics?user_id=${user_id}&sl_no=${sl_no}`,
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
					{/* <Sidebar /> */}
					{!companyData ? (
						<p className="h-screen w-full flex justify-center items-center text-[30px]">
							We are cooking the computation result, wait for atleast 2 minutes.
						</p>
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
											value={formattedMarketCap(companyData.market_cap)}
										/>
										<Card
											IconComponent={Diversity3OutlinedIcon}
											Item={"Diversity"}
											value={companyData.diversity}
										/>
									</div>
								</div>
								<ConversionRateCard
									stock={{
										2024: metrics?.yearly_changes?.stock_price?.[2024],
										2023: metrics?.yearly_changes?.stock_price?.[2023],
									}}
									expenses={{
										2024: metrics?.yearly_changes?.expenses?.[2024],
										2023: metrics?.yearly_changes?.expenses?.[2023],
									}}
									revenue={{
										2024: metrics?.yearly_changes?.revenue?.[2024],
										2023: metrics?.yearly_changes?.revenue?.[2023],
									}}
									marketShare={{
										2024: metrics?.yearly_changes?.market_share?.[2024],
										2023: metrics?.yearly_changes?.market_share?.[2023],
									}}
								/>
							</div>
							{metrics && (
								<>
									<h2 className="text-3xl font-serif font-bold">Metrics</h2>
									<div className="flex">
										<Card
											IconComponent={MilitaryTechIcon}
											Item={"Companies in Country"}
											value={metrics.total_companies_in_country}
										/>
										<Card
											IconComponent={MilitaryTechIcon}
											Item={"Diversity Rank(domestic)"}
											value={metrics.greater_diversity_companies_in_country}
										/>
									</div>
									<div className="flex space-x-4 mb-4">
										<button
											className={`px-4 py-2 ${
												activeTab === "yearlyChanges"
													? "bg-blue-500 text-white"
													: "bg-gray-200 text-black"
											}`}
											onClick={() => setActiveTab("yearlyChanges")}
										>
											Yearly Changes
										</button>
										<button
											className={`px-4 py-2 ${
												activeTab === "domesticComparison"
													? "bg-blue-500 text-white"
													: "bg-gray-200 text-black"
											}`}
											onClick={() => setActiveTab("domesticComparison")}
										>
											Domestic Comparison
										</button>
										<button
											className={`px-4 py-2 ${
												activeTab === "globalComparison"
													? "bg-blue-500 text-white"
													: "bg-gray-200 text-black"
											}`}
											onClick={() => setActiveTab("globalComparison")}
										>
											Global Comparison
										</button>
									</div>
									<div className="p-4 border rounded-lg">{renderContent()}</div>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		);
};

export default CompanyDashboard;
