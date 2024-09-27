"use client";
import React, { useState } from "react";
import HomeCard from "./homeCard";

// Define a type for the props
interface TopProps {
  prop: string; // Adjust the type based on the actual prop you're passing
}
// const [data, setData] = useState<string[]>([]);

export const Top: React.FC<TopProps> = ({ prop }) => {
  return (
    <div className="flex flex-wrap justify-evenly my-12">
      {/* top {prop}  */}
      {/* {data.length==0?null:data.map((company, index) => ( */}
      <HomeCard
        company="EaseMyTrip"
        price={34.81}
        change={-1.77}
        logoUrl="https://ui-avatars.com/api/?name=EaseMyTrip&size=200&background=random&color=random"
      />
      <HomeCard
        company="EaseMyTrip"
        price={34.81}
        change={-1.77}
        logoUrl="https://ui-avatars.com/api/?name=ai&size=200&background=random&color=random"
      />
      <HomeCard
        company="EaseMyTrip"
        price={34.81}
        change={-1.77}
        logoUrl="https://ui-avatars.com/api/?name=ai&size=200&background=random&color=random"
      />
      <HomeCard
        company="EaseMyTrip"
        price={34.81}
        change={-1.77}
        logoUrl="https://ui-avatars.com/api/?name=ai&size=200&background=random&color=random"
      />
      <HomeCard
        company="EaseMyTrip"
        price={34.81}
        change={-1.77}
        logoUrl="https://ui-avatars.com/api/?name=ai&size=200&background=random&color=random"
      />
      {/* ))} */}
    </div>
  );
};
