import { useAppData, useData } from "@/AppProvider";
import IconRefresh from "@/assets/icons/IconRefresh";
import IconSearch from "@/assets/icons/IconSearch";
import DropdownFilter from "@/components/DropdownFilter";
import PaginationToolWatcher from "@/components/PaginationToolWatcher";
import SlideVertical from "@/components/SlideVertical";
import ComodityType from "@/types/ComodityType";
import ProductType from "@/types/ProductType";
import RegionType from "@/types/RegionType";
import {
	CSSProperties,
	ChangeEvent,
	Fragment,
	useEffect,
	useState,
} from "react";
import { useSearchParams } from "react-router-dom";

type ComodityWithRegionsType = ComodityType & {
	regions: RegionType[];
};
type ProductWithComoditiesAndRegionType = ProductType & {
	comodities: ComodityWithRegionsType[];
};

type FilterTypeMap = {
	comodities: ComodityType;
	regions: RegionType;
};

let TOTAL_PRODUCTS_PER_SLIDE = 9;
let MAX_PAGE_ON_PAGINATION = 5;
export default function ProductCatalogSplit() {
	const [params, setParams] = useSearchParams();
	const {
		products: { catalog },
		windowSize,
	} = useAppData();
	const {
		catalog: products,
	}: { catalog: ProductWithComoditiesAndRegionType[] } = useData();
	const [filteredProducts, setFilteredProducts] =
		useState<ProductWithComoditiesAndRegionType[]>(products);
	const [currentSlide, setCurrentSlide] = useState(1);
	const [totalSlide, setTotalSlide] = useState(0);
	const [filters, setFilters] = useState<{ [key: string]: any }>({});
	const [currentFilterValue, setCurrentFilterValue] = useState<{
		[key: string]: any;
	}>({});
	const [keyword, setKeyword] = useState("");
	const [withProductInfo, setWithProductInfo] = useState(false);
	const [runAnimation, setRunAnimation] = useState(true);
	const [currentSorting, setCurrentSorting] = useState("latest");
	async function initializeFilters() {
		const defaultFilterValue = {} as { [key: string]: any };
		for (let filter in catalog.filters) {
			if (filter == "comodities") {
				defaultFilterValue[filter] = [
					...catalog.filters[filter]
						.filter(
							(item: ComodityType) =>
								item.slug == params.get("commodity")
						)
						.map((e: ComodityType) => e.name),
				];
			} else {
				defaultFilterValue[filter] = [];
			}
		}

		setFilters(catalog.filters);
		setCurrentFilterValue(defaultFilterValue);
	}

	function setFilterValue(filter: string, value: string | string[]) {
		setCurrentFilterValue((prev) => {
			return {
				...prev,
				[filter]: value,
			};
		});
		setRunAnimation(false);
	}

	function getFilterValueOfArrayToString<K extends keyof FilterTypeMap>(
		filterSlug: K
	) {
		return (filters[filterSlug] as FilterTypeMap[K][]).map((e) => e.name);
	}

	function sortProducts(e: ChangeEvent<HTMLSelectElement>) {
		const value = e.target.value;
		setCurrentSorting(value);
		setRunAnimation(false);
	}

	function filterProducts() {
		// filters
		let newProductsFiltered: ProductWithComoditiesAndRegionType[] =
			products;
		for (let productFilterKey in currentFilterValue) {
			const values = currentFilterValue[productFilterKey];
			if (productFilterKey == "comodities") {
				newProductsFiltered = newProductsFiltered.filter(
					(product) =>
						values.length == 0 ||
						product.comodities.some((comodity) =>
							values.includes(comodity.name)
						)
				);
			} else if (productFilterKey == "regions") {
				newProductsFiltered = newProductsFiltered.filter(
					(product) =>
						values.length == 0 ||
						product.comodities.some((comodity) =>
							comodity.regions.some((region) =>
								values.includes(region.name)
							)
						)
				);
			}
		}

		// search
		newProductsFiltered = newProductsFiltered.filter((product) => {
			const searchKeyword = keyword.toLowerCase();
			return (
				product.name.toLowerCase().includes(searchKeyword) ||
				product.description.toLowerCase().includes(searchKeyword) ||
				product.comodities.some(
					(comodity) =>
						comodity.name.toLowerCase().includes(searchKeyword) ||
						comodity.regions.some((region) =>
							region.name.toLowerCase().includes(searchKeyword)
						)
				)
			);
		});

		// sorting
		newProductsFiltered.sort((prevProduct, nextProduct) => {
			if (currentSorting === "a-z") {
				return prevProduct.name.localeCompare(nextProduct.name);
			} else if (currentSorting === "z-a") {
				return nextProduct.name.localeCompare(prevProduct.name);
			} else if (currentSorting === "oldest") {
				return nextProduct.id - prevProduct.id;
			} else if (currentSorting === "latest") {
				return prevProduct.id - nextProduct.id;
			}
			return 0;
		});

		setFilteredProducts(newProductsFiltered);
	}

	function search(e: ChangeEvent<HTMLInputElement>) {
		setKeyword(e.currentTarget.value);
		setRunAnimation(false);
	}

	function refreshFilters() {
		setCurrentFilterValue((prev) => {
			const newFilterValue = {} as { [key: string]: any };
			for (const key in prev) {
				newFilterValue[key] = [];
			}
			return newFilterValue;
		});

		setKeyword("");
		setRunAnimation(false);
	}

	function getRegionFromComodities(comodities: ComodityWithRegionsType[]) {
		const regions: string[] = [];
		comodities.forEach((comodity) => {
			comodity.regions.forEach((region) => {
				if (!regions.includes(region.name)) {
					regions.push(region.name);
				}
			});
		});
		return regions;
	}

	function setPage(to: string | number) {
		window.scrollTo(0, 0);
		if (typeof to == "number") {
			if (to == currentSlide) return;
			setCurrentSlide(to);
		}

		if (to == "next" && currentSlide < totalSlide) {
			setCurrentSlide((prev) => prev + 1);
		} else if (to == "previous" && currentSlide > 1) {
			setCurrentSlide((prev) => prev - 1);
		}

		setRunAnimation(false);
	}

	useEffect(() => {
		setFilteredProducts(products);
		filterProducts();
	}, [products]);

	useEffect(() => {
		initializeFilters();
	}, []);

	useEffect(() => {
		filterProducts();
		setCurrentSlide(1);
	}, [currentFilterValue, keyword, currentSorting]);

	useEffect(() => {
		setTotalSlide(Math.ceil(products.length / TOTAL_PRODUCTS_PER_SLIDE));
	}, []);

	useEffect(() => {
		setTotalSlide(
			Math.ceil(filteredProducts.length / TOTAL_PRODUCTS_PER_SLIDE)
		);
	}, [filteredProducts]);

	if (Object.keys(filters).length <= 0 || products.length == 0) return null;
	return (
		<SlideVertical
			order={2}
			runAnimation={runAnimation}
			triggerBySelf={false}
		>
			<section className="product-catalog-split">
				{Object.keys(catalog.filters).length > 0 && (
					<aside className="product-catalog-filter">
						<header className="product-catalog-filter-header">
							<h2>Catalog Filter</h2>
							<button
								aria-label="Refresh Filter"
								className="btn-square"
								onClick={refreshFilters}
							>
								<IconRefresh width="24" height="24" />
							</button>
						</header>
						<section className="product-catalog-dropdowns">
							{Object.keys(filters).map((filterSlug, i) => (
								<Fragment key={i}>
									<DropdownFilter
										open={i == 0 && windowSize > 1024}
										title={
											filterSlug == "comodities"
												? "Commodities"
												: filterSlug[0].toUpperCase() +
												  filterSlug.slice(1)
										}
										items={getFilterValueOfArrayToString(
											filterSlug as keyof FilterTypeMap
										)}
										type="checkbox"
										onFilter={(value: string | string[]) =>
											setFilterValue(filterSlug, value)
										}
										currentItem={
											currentFilterValue[filterSlug]
										}
									/>
								</Fragment>
							))}
						</section>
					</aside>
				)}
				<section className="product-catalog-content">
					<header className="product-catalog-content-header">
						<div className="product-catalog-content-header-inputs">
							<div className="search-icon-box">
								<IconSearch
									width={"24"}
									height={"24"}
									className="search-icon"
								/>
								<input
									type="text"
									placeholder="Search post.."
									value={keyword}
									onChange={search}
								/>
							</div>
							<div className="flex gap-05 items-center product-sorting">
								<label htmlFor="sort-by">Sort By</label>
								<select onChange={sortProducts} id="sort-by">
									<option value="latest">Latest</option>
									<option value="oldest">Oldest</option>
									<option value="a-z">
										A - Z (Ascending)
									</option>
									<option value="z-a">
										Z - A (Descending)
									</option>
								</select>
							</div>
						</div>
						<div className="mt-1 mb-1 product-catalog-content-header-info">
							<p>
								Showing{" "}
								<span className="bold">
									{filteredProducts.length}
								</span>{" "}
								results from{" "}
								<span className="bold">{products.length}</span>{" "}
								products
							</p>
							<label
								htmlFor="with-product-info"
								className="flex gap-05 items-center"
							>
								<input
									type="checkbox"
									id="with-product-info"
									onChange={(e) => {
										setWithProductInfo(e.target.checked);
										setRunAnimation(false);
									}}
								/>
								<span>With Product Info</span>
							</label>
						</div>
					</header>
					<section className="product-catalog-content-cards">
						{filteredProducts.length > 0 ? (
							filteredProducts
								.slice(
									(currentSlide - 1) *
										TOTAL_PRODUCTS_PER_SLIDE,
									currentSlide * TOTAL_PRODUCTS_PER_SLIDE
								)
								.map((product) => (
									<article
										className="product-card"
										key={product.id}
										style={
											{
												"--backgroundImage": `url(${product.public_image})`,
											} as CSSProperties
										}
									>
										<div className="product-card-content">
											<h3>{product.name}</h3>
											<p>{product.description}</p>
										</div>

										{withProductInfo && (
											<div className="product-card-info">
												{catalog.filters.comodities && (
													<div className="product-comodities">
														<span className="bold">
															Comodities:
														</span>
														<span>
															{product.comodities
																.map(
																	(
																		comodity
																	) =>
																		comodity.name
																)
																.join(", ")}
														</span>
													</div>
												)}
												{catalog.filters.regions && (
													<div className="comodity-regions">
														<span className="bold">
															Regions:
														</span>
														<span>
															{getRegionFromComodities(
																product.comodities
															).join(", ")}
														</span>
													</div>
												)}
											</div>
										)}
									</article>
								))
						) : (
							<p>No products found</p>
						)}
					</section>
				</section>
			</section>
			<div className="mt-2">
				{filteredProducts.length > 0 && (
					<PaginationToolWatcher
						MAX_PAGE_ON_PAGINATION={MAX_PAGE_ON_PAGINATION}
						setPage={setPage}
						currentPage={currentSlide}
						maxPage={totalSlide}
					/>
				)}
			</div>
		</SlideVertical>
	);
}
