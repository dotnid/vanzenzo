import { useAppData, useData } from "@/AppProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideVertical from "@/components/SlideVertical";
import BenefitType from "@/types/BenefitType";
gsap.registerPlugin(ScrollTrigger);

export default function Benefits() {
	const {
		main: { benefits },
	} = useAppData();

	const { benefits: benefitsData }: { benefits: BenefitType[] } = useData();

	return (
		<section className="section-seperator main-section" id="benefits">
			<section className="container">
				<header className="section-header">
					<SlideVertical>
						<h2 className="section-header-title">
							{benefits.title}
						</h2>
						<h2 className="section-header-tagline">
							{benefits.tagline}
						</h2>
					</SlideVertical>
				</header>

				<section className="benefit-cards">
					<SlideVertical order={2} triggerBySelf={false}>
						{benefitsData.map((benefit) => (
							<article className="benefit-card" key={benefit.id}>
								<img
									className="benefit-icon"
									src={benefit.public_icon}
									alt={`Benefit Icon - ${benefit.title}`}
								/>
								<h3 className="benefit-title mt-1">
									{benefit.title}
								</h3>
								<p className="benefit-description">
									{benefit.description}
								</p>
							</article>
						))}
					</SlideVertical>
				</section>
			</section>
		</section>
	);
}
