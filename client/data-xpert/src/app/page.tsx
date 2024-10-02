import Navbar from "../components/navbar";
import HomeMain from "./home/homeMain";
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
			<HomeMain/>
    </div>
  );
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
