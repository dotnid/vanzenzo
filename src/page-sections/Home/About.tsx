import GraphicC from "@/assets/images/graphic-C.png";
import GraphicI from "@/assets/images/graphic-I.png";
import GraphicG from "@/assets/images/graphic-G.png";
import { useAppData } from "@/AppProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import SlideHorizontal from "@/components/SlideHorizontal";
import SlideVertical from "@/components/SlideVertical";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
	const {
		main: { about },
		windowSize,
	} = useAppData();

	const graphicC = useRef(null);
	const graphicI = useRef(null);
	const graphicG = useRef(null);

	useEffect(() => {
		gsap.fromTo(
			graphicC.current,
			{ translateY: -300, opacity: 0 },
			{
				translateY: 0,
				opacity: 1,
				duration: 1,
				scrollTrigger: {
					trigger: graphicC.current,
					start: `top ${windowSize <= 768 ? "40%" : "70%"}`,
				},
			}
		);
		gsap.fromTo(
			graphicI.current,
			{ translateY: -300, opacity: 0 },
			{
				translateY: 0,
				opacity: 1,
				duration: 1,
				delay: 0.3,
				scrollTrigger: {
					trigger: graphicI.current,
					start: `top ${windowSize <= 768 ? "40%" : "70%"}`,
				},
			}
		);
		gsap.fromTo(
			graphicG.current,
			{ translateY: -300, opacity: 0 },
			{
				translateY: 0,
				opacity: 1,
				duration: 1,
				delay: 0.6,
				scrollTrigger: {
					trigger: graphicG.current,
					start: `top ${windowSize <= 768 ? "40%" : "70%"}`,
				},
			}
		);
	}, [windowSize]);

	return (
		<section className="section-seperator main-section" id="about" style={{ 
			paddingBlock: '6rem'
		 }}>
			<section className="container">
				<section className="about-images">
					<div className="about-image">
						<img
							src={GraphicC}
							alt="Graphic Word C"
							ref={graphicC}
						/>
					</div>
					<div className="about-image">
						<img
							src={GraphicI}
							alt="Graphic Word I"
							ref={graphicI}
						/>
					</div>
					<div className="about-image">
						<img
							src={GraphicG}
							alt="Graphic Word G"
							ref={graphicG}
						/>
					</div>
				</section>
				<section className="about-content">
					<header className="section-header section-header-left">
						{windowSize <= 768 ? (
							<SlideVertical order={0} triggerBySelf={false}>
								<h2 className="section-header-title">
									{about.title}
								</h2>
								<h2 className="section-header-tagline">
									{about.tagline}
								</h2>
							</SlideVertical>
						) : (
							<SlideHorizontal order={0}>
								<h2 className="section-header-title">
									{about.title}
								</h2>
								<h2 className="section-header-tagline">
									{about.tagline}
								</h2>
							</SlideHorizontal>
						)}
					</header>

					{windowSize <= 768 ? (
						<SlideVertical order={2}>
							<p className="about-description mt-05">
								{about.description}
							</p>
						</SlideVertical>
					) : (
						<SlideHorizontal order={2}>
							<p className="about-description mt-05">
								{about.description}
							</p>
						</SlideHorizontal>
					)}
				</section>
			</section>
		</section>
	);
}
