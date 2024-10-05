"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Chart from "@/components/graph"

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
const data = [
    { year: "2015", price: 101860000 },
    { year: "2016", price: 2960000000 },
    { year: "2017", price: 0 },
    { year: "2018", price: 12630000 },
    { year: "2019", price: 2600000000 },
    { year: "2020", price: 2010000000 },
    { year: "2021", price: 1090000000 },
    { year: "2022", price: 0 },
    { year: "2023", price: 7930000000 },
    { year: "2024", price: 4140000000 },
  ];
const CompanyDashboard = () => {
  const { sl_no } = useParams();
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (sl_no) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/compute-metrics?sl_no=${sl_no}` // Adjust the API route if needed
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
          <div className="scroll-auto h-dvh overflow-auto w-dvw">
            <div className="flex">
			<img src={`https://ui-avatars.com/api/?name=${companyData.company}&size=200&background=random&color=random`} alt="Avatar" />
			<div>
                <h1>{companyData.company}</h1>
                <p>Status: {status}</p>
                <p>Message: {message}</p>
                <p>Country: {companyData.country}</p>
                <p>Country Code: {companyData.country_code}</p>
                <p>Market Cap: {companyData.market_cap}</p>
                <p>Diversity: {companyData.diversity}</p>
              </div>
            </div>

            {metrics && (
              <>
                <h2>Metrics</h2>
                <p>
                  Total Companies in Country:{" "}
                  {metrics.total_companies_in_country}
                </p>
                <p>
                  Greater Diversity Companies in Country:{" "}
                  {metrics.greater_diversity_companies_in_country}
                </p>

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
							  <Chart data={yearData}/>
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
							<Chart data={yearData}/>
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
							<Chart data={yearData}/>
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
