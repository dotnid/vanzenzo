import { useAppData, useData } from "@/AppProvider";
import CompanyType from "@/types/CompanyType";
import IconCopy from "./../../assets/icons/IconCopy";
import SlideVertical from "@/components/SlideVertical";

export default function Location() {
	const {
		main: { location },
	} = useAppData();

	const { my_company: company }: { my_company: CompanyType } = useData();

	return (
		<section className="section-seperator main-section" id="location">
			<div className="container">
				<header className="section-header">
					<SlideVertical>
						<h2 className="section-header-title">
							{location.title}
						</h2>
						<h2 className="section-header-tagline">
							{location.tagline}
						</h2>
					</SlideVertical>
				</header>

				<SlideVertical order={2}>
					<div className="location-content">
						<p className="location-label">{company.address}</p>
						<button
							className="btn location-copy"
							onClick={() =>
								navigator.clipboard.writeText(company.address)
							}
						>
							<IconCopy width={"24"} height={"24"} />
							Copy Address
						</button>
					</div>
				</SlideVertical>

				<SlideVertical order={3}>
					<div className="location-map">
						<iframe
							title={`Map of ${company.name}`}
							src={company.iframe_src}
							style={{ border: 0 }}
							loading="lazy"
							width="100%"
							height="400"
						></iframe>
					</div>
				</SlideVertical>
			</div>
		</section>
	);
}
