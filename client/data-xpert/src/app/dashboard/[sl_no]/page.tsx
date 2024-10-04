"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

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
						`http://localhost:4000/api/compute-metrics?sl_no=${sl_no}`, // Adjust the API route if needed
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

	if (!companyData) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<Navbar />
			<div className="flex flex-row">
				<Sidebar />
				<div>
					<h1>{companyData.company}</h1>
					<p>Status: {status}</p>
					<p>Message: {message}</p>
					<p>Country: {companyData.country}</p>
					<p>Country Code: {companyData.country_code}</p>
					<p>Market Cap: {companyData.market_cap}</p>
					<p>Diversity: {companyData.diversity}</p>

					{/* Displaying metrics */}
					{metrics && (
						<>
							<h2>Metrics</h2>
							<p>
								Total Companies in Country: {metrics.total_companies_in_country}
							</p>
							<p>
								Greater Diversity Companies in Country:{" "}
								{metrics.greater_diversity_companies_in_country}
							</p>
							{/* Add more metrics display based on the structure */}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CompanyDashboard;
