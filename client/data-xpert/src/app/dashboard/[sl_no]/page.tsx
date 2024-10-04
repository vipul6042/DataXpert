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


interface ApiResponse {
	status: string;
	message: string;
	company: CompanyData;
}

const CompanyDashboard = () => {
	const { sl_no } = useParams();
	const [companyData, setCompanyData] = useState<CompanyData | null>(null);
	const [status, setStatus] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		if (sl_no) {
			const fetchData = async () => {
				try {
					const response = await fetch(
						`http://localhost:4000/api/company/${sl_no}`,
					);
					if (!response.ok) {
						throw new Error("Failed to fetch company data");
					}
					const data: ApiResponse = await response.json();

					setCompanyData(data.company);
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
				</div>
			</div>
		</div>
	);
};

export default CompanyDashboard;
