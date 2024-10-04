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
				<HomeMain />
				{/* <HeroSection /> */}
			</div>
		);


}
