import { useAppData, useData } from "@/AppProvider";
import ClientType from "@/types/ClientType";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SlideHorizontal from "@/components/SlideHorizontal";
import SlideVertical from "@/components/SlideVertical";

export default function Clients() {
	const {
		main: { our_client },
		windowSize,
	} = useAppData();

	const { clients }: { clients: ClientType[] } = useData();
	return (
		<section className="section-seperator main-section" id="clients">
			<section className="container">
				<header className="section-header">
					<SlideVertical>
						<h2 className="section-header-title">
							{our_client.title}
						</h2>
						<h2 className="section-header-tagline">
							{our_client.tagline}
						</h2>
					</SlideVertical>
				</header>

				<section className="client-sliders-watcher">
					<SlideHorizontal
						toDirection="left"
						order={2}
						triggerBySelf={!(windowSize <= 768)}
					>
						<section className="client-sliders">
							<section className="client-slider">
								{clients.map((client, i) => (
									<article className="client-card" key={i}>
										<div className="client-logo">
											<LazyLoadImage
												src={client.public_logo}
												alt={`Client Logo - ${client.name}`}
											/>
										</div>
										<h3 className="client-name">
											{client.name}
										</h3>
									</article>
								))}
							</section>
							<section className="client-slider">
								{clients.map((client, i) => (
									<article className="client-card" key={i}>
										<div className="client-logo">
											<LazyLoadImage
												src={client.public_logo}
												alt={`Client Logo - ${client.name}`}
											/>
										</div>
										<h3 className="client-name">
											{client.name}
										</h3>
									</article>
								))}
							</section>
						</section>
					</SlideHorizontal>
					<section className="client-sliders mt-1">
						<SlideHorizontal
							toDirection="right"
							order={2}
							triggerBySelf={!(windowSize <= 768)}
						>
							<section className="client-slider">
								{clients.map((client, i) => (
									<article className="client-card" key={i}>
										<div className="client-logo">
											<LazyLoadImage
												src={client.public_logo}
												alt={`Client Logo - ${client.name}`}
											/>
										</div>
										<h3 className="client-name">
											{client.name}
										</h3>
									</article>
								))}
							</section>
							<section className="client-slider">
								{clients.map((client, i) => (
									<article className="client-card" key={i}>
										<div className="client-logo">
											<LazyLoadImage
												src={client.public_logo}
												alt={`Client Logo - ${client.name}`}
											/>
										</div>
										<h3 className="client-name">
											{client.name}
										</h3>
									</article>
								))}
							</section>
						</SlideHorizontal>
					</section>
				</section>
			</section>
		</section>
	);
}
