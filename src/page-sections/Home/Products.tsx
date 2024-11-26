import { useAppData, useData } from "@/AppProvider";
import ArrowPagination from "@/components/ArrowPagination";
import SlideVertical from "@/components/SlideVertical";
import { CSSProperties, useEffect, useState } from "react";
import ProductType from "@/types/ProductType";
import { Link } from "react-router-dom";

let TOTAL_PRODUCTS_PER_SLIDE = 3;

export default function Products() {
	const [currentSlide, setCurrentSlide] = useState(1);
	const [runHeaderAnimation, setRunHeaderAnimation] = useState(true);
	const [totalSlide, setTotalSlide] = useState(0);
	const {
		main: { products },
		windowSize,
	} = useAppData();

	if (windowSize <= 768) {
		TOTAL_PRODUCTS_PER_SLIDE = 4;
	}

	const { products: productsData }: { products: ProductType[] } = useData();

	useEffect(() => {
		setTotalSlide(
			Math.ceil(productsData.length / TOTAL_PRODUCTS_PER_SLIDE)
		);
	}, []);

	return (
		<section className="section-seperator main-section" id="main-products">
			<div className="container">
				<header className="section-header">
					<SlideVertical runAnimation={runHeaderAnimation}>
						<h2 className="section-header-title">
							{products.title}
						</h2>
						<h2 className="section-header-tagline">
							{products.tagline}
						</h2>
						<Link
							to={products.button.link}
							className="btn mt-1"
							aria-label={products.button.text}
						>
							{products.button.text}
						</Link>
					</SlideVertical>
				</header>
				<section
					className="main-product-cards"
					style={{ "--slide": currentSlide - 1 } as CSSProperties}
				>
					<section className="main-product-cards-watcher">
						{new Array(totalSlide).fill(0).map((_, i) => (
							<section key={i} className="main-product-card-row">
								<SlideVertical
									order={2}
									triggerBySelf={!(windowSize <= 768)}
								>
									{productsData
										.slice(
											i * TOTAL_PRODUCTS_PER_SLIDE,
											i * TOTAL_PRODUCTS_PER_SLIDE +
												TOTAL_PRODUCTS_PER_SLIDE
										)
										.map((product) => (
											<article
												className="main-product-card"
												key={product.id}
												style={
													{
														"--backgroundImage": `url(${product.public_image})`,
													} as CSSProperties
												}
											>
												<h3>{product.name}</h3>
												<p>{product.description}</p>
											</article>
										))}
								</SlideVertical>
							</section>
						))}
					</section>
				</section>
				{productsData.length > TOTAL_PRODUCTS_PER_SLIDE && (
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
