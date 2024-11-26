import { useAppData, useData } from "@/AppProvider";
import VisionType from "@/types/VisionType";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import SlideHorizontal from "@/components/SlideHorizontal";
import SlideVertical from "@/components/SlideVertical";

gsap.registerPlugin(ScrollTrigger);

export default function Visions() {
	const {
		main: { our_vision: vision },
		windowSize,
	} = useAppData();

	const { visions }: { visions: VisionType[] } = useData();

	const visionImages = useRef<(HTMLImageElement | null)[]>([]);

	useEffect(() => {
		if (visions.length === 0) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".vision-images",
				start: "top 50%",
				end: "center top",
				scrub: true,
			},
		});

		visionImages.current.forEach((image) => {
			if (image) {
				tl.fromTo(
					image,
					{ opacity: 0 },
					{ opacity: 1, duration: 1, ease: "power2.inOut" }
				).to(image, {
					opacity: 0,
					duration: 1,
					ease: "power2.inOut",
				});
			}
		});
	}, [visions]);

	return (
		<section className="section-seperator main-section" id="visions">
			<div className="container">
				<header className="section-header section-header-left">
					{windowSize <= 768 ? (
						<SlideVertical order={0}>
							<h2 className="section-header-title">
								{vision.title}
							</h2>
							<h2 className="section-header-tagline">
								{vision.tagline}
							</h2>
						</SlideVertical>
					) : (
						<SlideHorizontal order={0}>
							<h2 className="section-header-title">
								{vision.title}
							</h2>
							<h2 className="section-header-tagline">
								{vision.tagline}
							</h2>
						</SlideHorizontal>
					)}
				</header>
				<section className="vision-split">
					<div className="vision-content">
						{windowSize <= 768 ? (
							<SlideVertical order={1} triggerBySelf={false}>
								{visions.map((v: VisionType, i: number) => (
									<article className="vision-card" key={v.id}>
										<div className="vision-card-image">
											<img
												src={v.public_image}
												alt={`Vision Image - ${v.title}`}
											/>
										</div>
										<p className="vision-card-number">
											{i + 1}
										</p>
										<h3 className="vision-card-title">
											{v.title}
										</h3>
										<p className="vision-card-description">
											{v.description}
										</p>
									</article>
								))}
							</SlideVertical>
						) : (
							<SlideHorizontal order={1} triggerBySelf={false}>
								{visions.map((v: VisionType, i: number) => (
									<article className="vision-card" key={v.id}>
										<div className="vision-card-image">
											<img
												src={v.public_image}
												alt={`Vision Image - ${v.title}`}
											/>
										</div>
										<p className="vision-card-number">
											{i + 1}
										</p>
										<h3 className="vision-card-title">
											{v.title}
										</h3>
										<p className="vision-card-description">
											{v.description}
										</p>
									</article>
								))}
							</SlideHorizontal>
						)}
					</div>
					<div className="vision-images">
						{visions.map((v, i) => (
							<figure className="vision-image" key={i}>
								<img
									src={v?.public_image}
									alt={`Vision Image - ${v?.title}`}
									ref={(el) => (visionImages.current[i] = el)}
								/>
							</figure>
						))}
					</div>
				</section>
			</div>
		</section>
	);
}
