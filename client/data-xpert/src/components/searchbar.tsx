"use client";
import React, { useState } from "react";

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredResults, setFilteredResults] = useState([]);

	const movies = [
		{ title: "Hello!", type: "TV", year: "2022" },
		{ title: "Hello", type: "Movie", year: "2022" },
		{ title: "Hello, Me!", type: "TV", year: "2021" },
		{ title: "Hello Brother", type: "Movie", year: "2005" },
		{ title: "Hello, Bookstore", type: "Documentary", year: "2021" },
	];

	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);

		if (query) {
			const results = movies.filter((movie) =>
				movie.title.toLowerCase().includes(query.toLowerCase()),
			);
			setFilteredResults(results);
		} else {
			setFilteredResults([]);
		}
	};

	return (
		<div className="p-4 flex flex-col items-center w-full">
			{/* Search Bar */}
			<div className="relative w-full max-w-2xl">
				<input
					type="text"
					className="w-full p-4 pl-12 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
					placeholder="Search movies, TV shows, and more..."
					value={searchQuery}
					onChange={handleSearch}
				/>
				<div className="absolute top-0 left-0 h-full flex items-center pl-4">
					<svg
						className="w-6 h-6 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M8 11a4 4 0 100-8 4 4 0 000 8zm13 11l-4.35-4.35"
						/>
					</svg>
				</div>
				<button className="absolute top-0 right-0 mt-2 mr-4 bg-green-500 p-2 rounded-full hover:bg-green-600">
					<svg
						className="w-6 h-6 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2v6m6 4H8a4 4 0 01-4-4V8a4 4 0 014-4h8a4 4 0 014 4v8"
						/>
					</svg>
				</button>
			</div>

			{/* Results */}
			{filteredResults.length > 0 && (
				<div className="mt-4 w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
					<ul>
						{filteredResults.map((result, index) => (
							<li key={index} className="border-b last:border-0 py-2">
								<p className="font-semibold">{result.title}</p>
								<p className="text-sm text-gray-500">
									{result.year} • {result.type}
								</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default SearchBar;
