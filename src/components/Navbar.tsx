import { useEffect, useState, useRef, Fragment } from "react";
import { useLocation } from "react-router-dom";
import SlideVertical from "./SlideVertical";
import { useData } from "@/AppProvider";
import CompanyType from "@/types/CompanyType";
import { Link } from "react-router-dom";

export default function Navbar() {
	const [openNavbar, setOpenNavbar] = useState(false);
	const [runAnimation, setRunAnimation] = useState(true);
	const navRef = useRef<HTMLDivElement>(null);

	const { my_company: company }: { my_company: CompanyType } = useData();
	const { pathname, hash } = useLocation();
	const links = [
		{
			text: "Home",
			path: "/#",
			active: pathname == "/" && hash === "#",
			type: "page",
		},
		{
			text: "About Us",
			path: "#about",
			active: hash === "#about",
			type: "hash",
			parent: "/",
		},
		{
			text: "Products",
			path: "#main-products",
			active: hash === "#main-products",
			type: "hash",
			parent: "/",
		},
		{
			text: "Commodities",
			path: "#comodities",
			active: hash === "#comodities",
			type: "hash",
			parent: "/",
		},
		{
			text: "Clients",
			path: "#clients",
			active: hash === "#clients",
			type: "hash",
			parent: "/",
		},
		{
			text: "Articles",
			path: "#articles",
			active: hash === "#articles",
			type: "hash",
			parent: "/",
		},
		{
			text: "Certifications",
			path: "#certifications",
			active: hash === "#certifications",
			type: "hash",
			parent: "/",
		},
		{
			text: "Catalog",
			path: "/products",
			active: pathname === "/products",
			type: "page",
		},
		{
			text: "Blog",
			path: "/articles#",
			active: pathname === "/articles",
			type: "page",
		},
		{
			text: "Latest",
			path: "#latest",
			active: hash === "#latest",
			type: "hash",
			parent: "/articles",
		},
		{
			text: "More",
			path: "#travel_more",
			active: hash === "#travel_more",
			type: "hash",
			parent: "/articles",
		},
	];

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				navRef.current &&
				!navRef.current.contains(event.target as Node)
			) {
				if (openNavbar) {
					setOpenNavbar(false);
				}
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openNavbar]);

	return (
		<nav
			className="container"
			id="navbar"
			ref={navRef}
			aria-description="A Navbar to navigate across pages"
		>
			<SlideVertical
				runAnimation={runAnimation}
				order={2}
				moveByProperty="positioning"
			>
				<div
					className="navbar-container"
					style={{ position: "relative" }}
				>
					<section className="navbar-logo">
						<img src={company.public_logo} alt="CIG's Logo" />
					</section>
					<ul className={`navbar-links ${openNavbar ? "open" : ""}`}>
						{links.map((link, i) => (
							<Fragment key={i}>
								{(link.type == "page" ||
									(link.type == "hash" &&
										link.parent == pathname)) && (
									<li>
										{link.type == "page" ? (
											<Link
												to={link.path}
												onClick={() => {
													setRunAnimation(false);
												}}
												className={
													link.active ? "active" : ""
												}
											>
												{link.text}
											</Link>
										) : (
											<a
												href={link.path}
												onClick={() => {
													setRunAnimation(false);
												}}
												className={
													link.active ? "active" : ""
												}
											>
												{link.text}
											</a>
										)}
									</li>
								)}
							</Fragment>
						))}
					</ul>
					<div
						className={`hamburger-menu ${openNavbar ? "open" : ""}`}
						onClick={() => {
							setOpenNavbar((prev) => !prev);
							setRunAnimation(false);
						}}
					>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</SlideVertical>
		</nav>
	);
}
