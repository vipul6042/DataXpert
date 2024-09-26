import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import SearchBar from "@/components/searchbar";

export default function Home() {
	return (
		<div className="h-screen w-[100%]">
			<Navbar />
			<SearchBar />
		</div>
	);
}