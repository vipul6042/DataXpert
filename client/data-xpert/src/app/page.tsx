import Navbar from "../components/navbar";
import HomeMain from "./home/homeMain";

export default function Home(this: any) {
  return (
    <div className="h-screen w-[100%]">
			<Navbar />
			<HomeMain/>
    </div>
  );
}
