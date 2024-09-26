"use client";
import React, { useState } from 'react';
import HomeCard from './homeCard';

// Define a type for the props
interface TopProps {
  prop: string; // Adjust the type based on the actual prop you're passing
}
// const [data, setData] = useState<string[]>([]);

export const Top: React.FC<TopProps> = ({ prop }) => {
  return (
    <div>
      top {prop} 
      {/* {data.length==0?null:data.map((company, index) => ( */}
        <HomeCard/> 
        <HomeCard/> 
        <HomeCard/> 
        <HomeCard/> 
        <HomeCard/> 
        <HomeCard/> 
        <HomeCard/> 
      {/* ))} */}
    </div>
  );
};
