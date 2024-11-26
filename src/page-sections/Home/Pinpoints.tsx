import { useAppData, useData } from "@/AppProvider";
import MapImage from "@/assets/images/map-white.png";
import { CSSProperties, Fragment, useEffect, useRef, useState } from "react";
import PinpointType from "@/types/PinpointType";
import PinpointProvince from "@/assets/images/province-pin.png";
import PinpointHarbor from "@/assets/images/harbor-pin.png";
import ComodityType from "@/types/ComodityType";
import ShipImage from "@/assets/images/ship.png";
import AnimationFadeSequence from "@/components/AnimationFadeSequence";
import FadeIn from "@/components/FadeIn";
import SlideVertical from "@/components/SlideVertical";
import { Link } from "react-router-dom";

export default function Pinpoints() {
	const [runAnimation, setRunAnimation] = useState(true);
	const [provinceImageDimensions, setProvinceImageDimensions] = useState({
		width: 0,
		height: 0,
	});
	const [harborImageDimensions, setHarborImageDimensions] = useState({
		width: 0,
		height: 0,
	});
	const [runHeaderAnimation, setRunHeaderAnimation] = useState(true);
	const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
	const [visibleDescriptions, setVisibleDescriptions] = useState<
		Record<number, boolean>
	>({});

	const provinceImgRef = useRef<HTMLImageElement>(null);
	const harborImgRef = useRef<HTMLImageElement>(null);
	const mapImgRef = useRef<HTMLImageElement>(null);

	const {
		main: { pinpoints },
	} = useAppData();

	const { pinpoints: pinpointsData }: { pinpoints: PinpointType[] } =
		useData();

	useEffect(() => {
		if (provinceImgRef.current) {
			const provinceRect = provinceImgRef.current.getBoundingClientRect();
			setProvinceImageDimensions({
				width: provinceRect.width,
				height: provinceRect.height,
			});
		}

		if (harborImgRef.current) {
			const harborRect = harborImgRef.current.getBoundingClientRect();
			setHarborImageDimensions({
				width: harborRect.width,
				height: harborRect.height,
			});
		}

		if (mapImgRef.current) {
			const mapRect = mapImgRef.current.getBoundingClientRect();
			setMapDimensions({ width: mapRect.width, height: mapRect.height });
		}
	}, [pinpointsData]);

	const toggleDescriptionVisibility = (index: number) => {
		setVisibleDescriptions((prev) => ({ ...prev, [index]: !prev[index] }));
		setRunAnimation(false);
	};

	return (
		<section id="pinpoints" className="main-section">
			<div className="container">
				<header className="section-header">
					<SlideVertical runAnimation={runHeaderAnimation}>
						<h2 className="section-header-title">
							{pinpoints.title}
						</h2>
						<h2 className="section-header-tagline">
							{pinpoints.tagline}
						</h2>
					</SlideVertical>
				</header>
				<FadeIn order={2} runAnimation={runAnimation}>
					<div className="pinpoints-map">
						{/* Hidden images to get dimensions */}
						<img
							ref={provinceImgRef}
							src={PinpointProvince}
							alt="Pinpoint Province"
							style={{
								position: "absolute",
								visibility: "hidden",
							}}
						/>
						<img
							ref={harborImgRef}
							src={PinpointHarbor}
							alt="Pinpoint Harbor"
							style={{
								position: "absolute",
								visibility: "hidden",
							}}
						/>
						<img
							ref={mapImgRef}
							src={MapImage}
							alt="Indonesia Map"
							className="map-image"
							style={{
								position: "absolute",
								visibility: "hidden",
							}}
						/>

						{pinpointsData.map(
							(pinpoint: PinpointType, i: number) => {
								const isProvince =
									pinpoint.region.type === "province";
								const { width, height } = isProvince
									? provinceImageDimensions
									: harborImageDimensions;

								const top =
									parseFloat(pinpoint.pos_y as string) -
									(height / mapDimensions.height) * 100;

								const left =
									parseFloat(pinpoint.pos_x as string) -
									(width / 2 / mapDimensions.width) * 100;

								const identifierPosition =
									left > 30 && left < 70
										? "center"
										: left > 70
										? "right"
										: "left";

								return (
									<div
										key={i}
										className="pinpoint"
										style={
											{
												"--top": `${top}`,
												"--left": `${left}`,
											} as CSSProperties
										}
									>
										<img
											className="pinpoint-image"
											src={
												isProvince
													? PinpointProvince
													: PinpointHarbor
											}
											alt="Pinpoint"
										/>

										{isProvince && (
											<div
												className="pinpoint-comodities"
												style={
													{
														"--total":
															pinpoint.region
																.comodities
																.length,
													} as CSSProperties
												}
											>
												<AnimationFadeSequence>
													{pinpoint.region.comodities.map(
														(
															comodity: ComodityType,
															order: number
														) => (
															<img
																key={order}
																src={
																	comodity.public_icon
																}
																alt={`Pinpoint comodity - ${comodity.name}`}
																style={
																	{
																		"--order":
																			order,
																	} as CSSProperties
																}
															/>
														)
													)}
												</AnimationFadeSequence>
											</div>
										)}

										<div
											className={`pinpoint-identifier identifier-${pinpoint.region.type} identifier-${identifierPosition}`}
										>
											{isProvince ? (
												<>
													<h5 className="pinpoint-identifier-name">
														{pinpoint.region.name}
													</h5>
													<p className="pinpoint-identifier-comodity mt-05">
														To explore:{" "}
														{pinpoint.region.comodities.map(
															(
																comodity: ComodityType,
																i: number
															) => (
																<Fragment
																	key={i}
																>
																	<Link
																		to={`/products?commodity=${comodity.slug}`}
																	>
																		<span className="pinpoint-identifier-comodity-inline">
																			<img
																				src={
																					comodity.public_icon
																				}
																				alt={`Pinpoint comodity - ${comodity.name}`}
																			/>
																			{
																				comodity.name
																			}{" "}
																		</span>
																	</Link>
																	{i !==
																		pinpoint
																			.region
																			.comodities
																			.length -
																			1 &&
																		" | "}
																</Fragment>
															)
														)}
													</p>
													<button
														className="pinpoint-identifier-why mt-05"
														onClick={() => {
															toggleDescriptionVisibility(
																i
															);
															setRunHeaderAnimation(
																false
															);
														}}
													>
														Why{" "}
														{pinpoint.region.name}?
													</button>
													{visibleDescriptions[i] && (
														<p className="pinpoint-identifier-description">
															{
																pinpoint.region
																	.description
															}
														</p>
													)}
												</>
											) : (
												<>
													<img
														src={ShipImage}
														alt="Ship"
													/>
													<h5 className="pinpoint-identifier-name">
														{pinpoint.region.name}
													</h5>
												</>
											)}
										</div>
									</div>
								);
							}
						)}

						<img
							src={MapImage}
							alt="Indonesia Map"
							className="map-image"
						/>
					</div>
				</FadeIn>
			</div>
		</section>
	);
}
