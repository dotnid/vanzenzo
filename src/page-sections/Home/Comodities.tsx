import { useAppData, useData } from "@/AppProvider";
import ArrowPagination from "@/components/ArrowPagination";
import SlideVertical from "@/components/SlideVertical";
import ComodityType from "@/types/ComodityType";
import { CSSProperties, useEffect, useState } from "react";
import { Link } from "react-router-dom";

let TOTAL_COMODITIES_PER_SLIDE = 10;

export default function Comodities() {
	const [currentSlide, setCurrentSlide] = useState(1);
	const [runHeaderAnimation, setRunHeaderAnimation] = useState(true);
	const [totalSlide, setTotalSlide] = useState(0);
	const {
		main: { comodity },
	} = useAppData();

	const { comodities: comodityData }: { comodities: ComodityType[] } =
		useData();

	useEffect(() => {
		setTotalSlide(
			Math.ceil(comodityData.length / TOTAL_COMODITIES_PER_SLIDE)
		);
	}, []);

	return (
		<section className="section-seperator main-section" id="comodities">
			<div className="container">
				<header className="section-header">
					<SlideVertical runAnimation={runHeaderAnimation}>
						<h2 className="section-header-title">
							{comodity.title}
						</h2>
						<h2 className="section-header-tagline">
							{comodity.tagline}
						</h2>
					</SlideVertical>
				</header>

				<section
					className="comodity-cards"
					style={{ "--slide": currentSlide - 1 } as CSSProperties}
				>
					<section className="comodity-cards-watcher">
						{new Array(totalSlide).fill(0).map((_, i) => (
							<section key={i} className="comodity-card-row">
								<SlideVertical order={2} triggerBySelf={false}>
									{comodityData
										.slice(
											i * TOTAL_COMODITIES_PER_SLIDE,
											i * TOTAL_COMODITIES_PER_SLIDE +
												TOTAL_COMODITIES_PER_SLIDE
										)
										.map((comodity) => (
											<Link
												to={`/products?commodity=${comodity.slug}`}
												className="no-hover"
												key={comodity.id}
											>
												<figure className="comodity-card">
													<img
														className="comodity-icon"
														src={
															comodity.public_icon
														}
														alt={`Comodity Icon - ${comodity.name}`}
													/>
													<figcaption className="comodity-name">
														{comodity.name}
													</figcaption>
												</figure>
											</Link>
										))}
								</SlideVertical>
							</section>
						))}
					</section>
				</section>

				{comodityData.length > TOTAL_COMODITIES_PER_SLIDE && (
					<section className="mt-1">
						<ArrowPagination
							totalPage={totalSlide}
							currentPage={currentSlide}
							setPage={(page) => {
								setCurrentSlide(page);
								setRunHeaderAnimation(false);
							}}
						/>
					</section>
				)}
			</div>
		</section>
	);
}
