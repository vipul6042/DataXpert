import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import SearchBar from "@/components/searchbar";
import HeroSection from "@/components/herosection";
import { Top } from "./home/top";
// const handleSearch = (e: any): void => {
//     console.log(e);
// };

export default function Home(this: any) {
  return (
			<div className="h-screen w-[100%]">
				<Navbar />
				<HeroSection />
				{/* <div className="text:3.5rem">All things finance,</div>
				<div>right here.</div>

				<div>
					top market cap
					<Top prop="market cap" />
				</div>
				<div>
					top diversity
					<Top prop="market cap" />
				</div>
				<div>
					top gainer
					<Top prop="market cap" />
				</div>
				<div>
					top looser
					<Top prop="market cap" />
				</div> */}
			</div>
		);
}
