import React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import { useRouter } from "next/navigation";
interface HomeCardProps {
  company: string;
  price: string;
  change: number;
  logoUrl: string;
}

const HomeCard: React.FC<HomeCardProps> = ({
  company,
  price,
  change,
  logoUrl,
}) => {
  const router = useRouter();
  const handleResultClick = (sl_no: number) => {
    const userId = localStorage.getItem("user_id");
    if (userId == null) router.push("/auth/login");
    else router.push(`/dashboard/${userId}/${sl_no}`);
  };

  return (
    <div
      onClick={() => handleResultClick(change)}
      className="border rounded-lg  w-40 text-center shadow-md m-5"
    >
      <CardActionArea className="p-4">
        <div className="pt-6 pb-3">
          <div className="mb-2">
            <img
              src={logoUrl}
              alt={`${company} logo`}
              className="w-10 h-10 mx-auto"
            />
          </div>
          <div className="text-lg font-semibold">{company}</div>
          <div className="text-xl font-bold mt-2">{price}</div>
          <div className={`text-sm mt-1 `}></div>
        </div>
      </CardActionArea>
    </div>
  );
};

export default HomeCard;
