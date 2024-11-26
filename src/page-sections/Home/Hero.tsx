import { useAppData } from "@/AppProvider";
import HeroImage1 from "@/assets/images/hero-image-1.png";
import HeroImage2 from "@/assets/images/hero-image-2.png";
import HeroImage3 from "@/assets/images/hero-image-3.png";
import { CSSProperties } from "react";
import AnimationFadeSequence from "@/components/AnimationFadeSequence";
import SlideVertical from "@/components/SlideVertical";
import SlideHorizontal from "@/components/SlideHorizontal";
import { HashLink } from "react-router-hash-link";

export default function Hero() {
	const {
		main: { hero },
	} = useAppData();

	return (
		<section id="hero" className="main-section">
			<div className="container">
				<SlideVertical order={1}>
					<h1 className="hero-title">{hero.title}</h1>
				</SlideVertical>
				<SlideVertical order={1}>
					<figure className="hero-image">
						<AnimationFadeSequence>
							<img
								src={HeroImage1}
								alt="Hero Image 1"
								style={{ "--order": 1 } as CSSProperties}
							/>
							<img
								src={HeroImage2}
								alt="Hero Image 2"
								style={{ "--order": 2 } as CSSProperties}
							/>
							<img
								src={HeroImage3}
								alt="Hero Image 3"
								style={{ "--order": 3 } as CSSProperties}
							/>
						</AnimationFadeSequence>
					</figure>
				</SlideVertical>
				<SlideVertical order={2}>
					<p className="hero-description">{hero.description}</p>
					<nav className="hero-buttons" aria-label="Hero buttons">
						<HashLink
							to={hero.left_button.link}
							className="btn"
							aria-label={hero.left_button.text}
						>
							{hero.left_button.text}
						</HashLink>
						<HashLink
							to={hero.right_button.link}
							className="btn btn-empty"
							aria-label={hero.right_button.text}
						>
							{hero.right_button.text}
						</HashLink>
					</nav>
				</SlideVertical>
			</div>
			<aside className="hero-slider">
				<div className="container">
					<SlideHorizontal toDirection="left" order={2}>
						<div className="sliders">
							<div className="slider">
								{hero.slider.map((text: string, i: number) => (
									<p key={i}>{text}</p>
								))}
							</div>
							<div className="slider">
								{hero.slider.map((text: string, i: number) => (
									<p key={i}>{text}</p>
								))}
							</div>
						</div>
					</SlideHorizontal>
				</div>
			</aside>
		</section>
	);
}
