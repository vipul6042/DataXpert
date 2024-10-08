"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import HistoryCard from "@/components/histroy";

interface HistoryItem {
  sl_no: number;
  company_detail: {
    company: string;
    market_cap: number;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
  user_id: number;
}

const HistoryPage = () => {
  const { user_id } = useParams();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const BASE_API = process.env.NEXT_PUBLIC_API;
  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await fetch(
          `${BASE_API}/api/history?user_id=${user_id}`
        );
        const data = await response.json();

        if (response.ok) {
          setHistory(data.history);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch user history.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, [user_id, BASE_API]);

  if (loading) {
    return <div>Loading user history...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(history);

  return (
    <div>
      <Navbar />
      <div className="flex flex-row">
        <div className="flex-grow p-4 overflow-auto h-screen hide-scrollbar">
          <h1 className="text-xl font-bold">User History</h1>
          {history.length === 0 ? (
            <p>No history found for this user.</p>
          ) : (
            <div className="flex flex-wrap gap-5">
              {history.map((item, index) => (
                <HistoryCard
                  key={index}
                  sl_no={item.sl_no}
                  title={item.company_detail.company}
                  time={item.createdAt}
                  amount={item.company_detail.market_cap}
                  date={item.createdAt}
                  status={item.company_detail.country}
                  user_Id={item.user_id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
