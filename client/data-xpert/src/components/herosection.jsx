import React from "react";
import SearchBar from "../components/searchbar";
import HeroAnimation from "../../public/heroAnimaton.gif";
import Image from "next/image";

const HeroSection = () => {
	return (
		<div className="p-8 flex justify-between items-center">
			{/* Left-aligned text content */}
			<div className="flex flex-col items-start">
				<h1 className="text-4xl font-bold mb-4">
					Boost Your Marketing and Sales
				</h1>
				<p className="text-lg text-gray-600 mb-6">
					Our platform simplifies managing sales data, statistics, and reports.
				</p>

				{/* Call the SearchBar component */}
				<SearchBar />
			</div>

			{/* Right-aligned animation or image placeholder */}
			<div className="flex items-center">
				{/* Add your animation here */}
				<Image src={HeroAnimation} height={300} width={300} alt="Animation" />
			</div>
		</div>
	);
};

export default HeroSection;
