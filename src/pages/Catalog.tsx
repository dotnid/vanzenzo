import { useAppData } from "@/AppProvider";
import SlideVertical from "@/components/SlideVertical";
import ProductCatalogSplit from "@/page-sections/Blog/ProductCatalogSplit";
import { Helmet } from "react-helmet-async";
export default function Catalog() {
	const data = useAppData();
	const { main } = data.products;
	return (
		<section className="main-section" id="product-catalog">
			<Helmet>
				<meta charSet="utf-8" />
				<title>PT Crescentia Indo Global | {main.title}</title>
				<link rel="description" content={main.description} />
			</Helmet>
			<div className="container">
				<SlideVertical>
					<h1 className="product-catalog-title">{main.title}</h1>
					<p className="product-catalog-description">
						{main.description}
					</p>
				</SlideVertical>
				<ProductCatalogSplit />
			</div>
		</section>
	);
}
