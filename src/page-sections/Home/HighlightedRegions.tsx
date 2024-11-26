import { useAppData, useData } from "@/AppProvider";
import ArrowPagination from "@/components/ArrowPagination";
import SlideVertical from "@/components/SlideVertical";
import PinpointType from "@/types/PinpointType";
import { CSSProperties, useEffect, useState } from "react";
import { Link } from "react-router-dom";

let TOTAL_REGIONS_PER_SLIDE = 6;

export default function HighlightedRegions() {
	const {
		main: { highlighted_regions },
	} = useAppData();

	const { pinpoints }: { pinpoints: PinpointType[] } = useData();
	const [currentSlide, setCurrentSlide] = useState(1);
	const [runHeaderAnimation, setRunHeaderAnimation] = useState(true);
	const [totalSlide, setTotalSlide] = useState(0);

	useEffect(() => {
		setTotalSlide(Math.ceil(pinpoints.length / TOTAL_REGIONS_PER_SLIDE));
	}, []);

	if (pinpoints.length <= 0) return;
	return (
		<section className="main-section" id="highlighted-regions">
			<div className="container">
				<header className="section-header">
					<SlideVertical runAnimation={runHeaderAnimation}>
						<h2 className="section-header-title">
							{highlighted_regions.title}
						</h2>
						<h2 className="section-header-tagline">
							{highlighted_regions.tagline}
						</h2>
					</SlideVertical>
				</header>

				<section
					className="highlighted-region-cards"
					style={{ "--slide": currentSlide - 1 } as CSSProperties}
				>
					<section className="highlighted-region-cards-watcher">
						{new Array(totalSlide).fill(0).map((_, i) => (
							<section
								key={i}
								className="highlighted-region-card-row"
							>
								<SlideVertical order={2} triggerBySelf={false}>
									{pinpoints
										.slice(
											i * TOTAL_REGIONS_PER_SLIDE,
											i * TOTAL_REGIONS_PER_SLIDE +
												TOTAL_REGIONS_PER_SLIDE
										)
										.map((pinpoint) => {
											return (
												<article
													key={pinpoint.id}
													className={`highlighted-region-card highlighted-region-${pinpoint.region.type}`}
												>
													<h3>
														{pinpoint.region.name}
													</h3>
													<h4>
														{pinpoint.region.type}
													</h4>
													{pinpoint.region.comodities
														.length > 0 && (
														<div className="highlighted-region-card-comodities">
															{pinpoint.region.comodities.map(
																(comodity) => {
																	return (
																		<Link
																			key={
																				comodity.id
																			}
																			className="no-hover"
																			to={`/products?commodity=${comodity.slug}`}
																		>
																			<span className="comodity-badge">
																				<img
																					src={
																						comodity.public_icon
																					}
																					alt={`Comodity - ${comodity.name}`}
																				/>
																				<p>
																					{
																						comodity.name
																					}
																				</p>
																			</span>
																		</Link>
																	);
																}
															)}
														</div>
													)}
													<p>
														{
															pinpoint.region
																.description
														}
													</p>
												</article>
											);
										})}
								</SlideVertical>
							</section>
						))}
					</section>
				</section>

				{pinpoints.length > TOTAL_REGIONS_PER_SLIDE && (
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
