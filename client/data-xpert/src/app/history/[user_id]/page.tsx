"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

interface HistoryItem {
	sl_no: number;
	company_detail: string;
	computation_result: object; 
	createdAt: string;
	updatedAt: string;
}

const HistoryPage = () => {
	const { user_id } = useParams();
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserHistory = async () => {
			try {
				const response = await fetch(
					`http://localhost:4000/api/history?user_id=${user_id}`,
				);
				const data = await response.json();

				if (response.ok) {
					setHistory(data.history);
				} else {
					setError(data.message);
				}
			} catch (err) {
				setError("Failed to fetch user history.");
			} finally {
				setLoading(false);
			}
		};

		fetchUserHistory();
	}, [user_id]);

	if (loading) {
		return <div>Loading user history...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<Navbar />
			<div className="flex flex-row">
				<Sidebar />
				<div className="flex-grow p-4">
					<h1 className="text-xl font-bold">User History</h1>
					{history.length === 0 ? (
						<p>No history found for this user.</p>
					) : (
						<table className="min-w-full table-auto border-collapse">
							<thead>
								<tr>
									<th className="border p-2">SL No</th>
									<th className="border p-2">Company Detail</th>
									<th className="border p-2">Computation Result</th>
									<th className="border p-2">Date</th>
								</tr>
							</thead>
							<tbody>
								{history.map((item) => (
									<tr key={item.sl_no}>
										<td className="border p-2">{item.sl_no}</td>

										<td className="border p-2">

											<pre>
												{JSON.stringify(item.computation_result, null, 2)}
											</pre>
										</td>
										<td className="border p-2">
											{new Date(item.createdAt).toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</div>
	);
};

export default HistoryPage;
