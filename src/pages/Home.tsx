import { useAppData, useData } from "@/AppProvider";
import About from "@/page-sections/Home/About";
import Benefits from "@/page-sections/Home/Benefits";
import Clients from "@/page-sections/Home/Clients";
import Comodities from "@/page-sections/Home/Comodities";
import Hero from "@/page-sections/Home/Hero";
import OurTeams from "@/page-sections/Home/OurTeams";
import Pinpoints from "@/page-sections/Home/Pinpoints";
import Products from "@/page-sections/Home/Products";
import Visions from "@/page-sections/Home/Visions";
import Articles from "@/page-sections/Home/Articles";
import Certifications from "@/page-sections/Home/Certifications";
import Location from "@/page-sections/Home/Location";
import { useEffect } from "react";
import HighlightedRegions from "@/page-sections/Home/HighlightedRegions";

export default function Home() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { windowSize } = useAppData();

	return (
		<>
			<Hero />
			{windowSize <= 768 ? <HighlightedRegions /> : <Pinpoints />}
			<About />
			<Visions />
			<Benefits />
			<Products />
			<Comodities />
			<OurTeams />
			<Clients />
			<Articles />
			<Certifications />
			<Location />
		</>
	);
}
