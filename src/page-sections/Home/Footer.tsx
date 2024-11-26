import { useAppData, useData } from "@/AppProvider";
import IconLocation from "@/assets/icons/IconLocation";
import IconPhone from "@/assets/icons/IconPhone";
import SlideVertical from "@/components/SlideVertical";
import CompanyType from "@/types/CompanyType";
import SocialType from "@/types/SocialType";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
	const [runAnimation, setRunAnimation] = useState(true);
	const { windowSize } = useAppData();

	const {
		socials,
		my_company: company,
	}: { socials: SocialType[]; my_company: CompanyType } = useData();

	const links = [
		{
			text: "About Us",
			path: "#about",
			type: "hash",
			parent: "/",
		},
		{
			text: "Our Visions",
			path: "#visions",
			type: "hash",
			parent: "/",
		},
		{
			text: "Benefits",
			path: "#benefits",
			type: "hash",
			parent: "/",
		},
		{
			text: "Products",
			path: "#main-products",
			type: "hash",
			parent: "/",
		},
		{
			text: "Commodities",
			path: "#comodities",
			type: "hash",
			parent: "/",
		},
		{
			text: "Our Team",
			path: "#our-team",
			type: "hash",
			parent: "/",
		},
		{
			text: "Clients",
			path: "#clients",
			type: "hash",
			parent: "/",
		},
		{
			text: "Articles",
			path: "#articles",
			type: "hash",
			parent: "/",
		},
		{
			text: "Certifications",
			path: "#certifications",
			type: "hash",
			parent: "/",
		},
		{
			text: "Location",
			path: "#location",
			type: "hash",
			parent: "/",
		},
		{
			text: "Main",
			path: "#articles-main",
			type: "hash",
			parent: "/articles",
		},
		{
			text: "Latest",
			path: "#latest",
			type: "hash",
			parent: "/articles",
		},
		{
			text: "More",
			path: "#travel_more",
			type: "hash",
			parent: "/articles",
		},
	];

	function getMenus() {
		const { pathname } = useLocation();
		return links.filter((link) => link.parent == pathname);
	}

	return (
		<>
			{Object.keys(company).length > 0 && (
				<section className="section-seperator main-section" id="footer">
					<section className="container">
						<SlideVertical runAnimation={runAnimation}>
							<section className="company-description">
								<section className="company-logo">
									<img
										src={company.public_logo}
										alt={`Company Logo -- ${company.name}`}
									/>
								</section>
								<h3 className="company-name">{company.name}</h3>
								<p className="company-about">{company.about}</p>

								<section className="company-socials">
									{socials.map((social) => (
										<a href={social.link} key={social.id}>
											<img
												src={social.public_icon}
												alt={`Social Icon - ${social.type}`}
											/>
										</a>
									))}
								</section>
							</section>
						</SlideVertical>

						{getMenus().length > 0 && (
							<SlideVertical
								order={windowSize <= 768 ? 0 : 2}
								runAnimation={runAnimation}
							>
								<section className="footer-part">
									<h4>Menu</h4>
									<ul className="footer-menu">
										{getMenus().map((link, i) => (
											<li key={i}>
												{link.type == "page" ? (
													<Link
														to={link.path}
														onClick={() => {
															setRunAnimation(
																false
															);
														}}
													>
														{link.text}
													</Link>
												) : (
													<a
														href={link.path}
														onClick={() => {
															setRunAnimation(
																false
															);
														}}
													>
														{link.text}
													</a>
												)}
											</li>
										))}
									</ul>
								</section>
							</SlideVertical>
						)}
						<SlideVertical
							order={windowSize <= 768 ? 0 : 3}
							runAnimation={runAnimation}
						>
							<section className="footer-part company-info">
								<h4>Company Info</h4>
								<p className="company-address">
									<IconLocation width={"24"} height={"24"} />
									{company.address}
								</p>
								<p className="company-contact">
									<IconPhone width={"24"} height={"24"} />
									{company.phone}
								</p>
							</section>
						</SlideVertical>
					</section>
				</section>
			)}
		</>
	);
}
