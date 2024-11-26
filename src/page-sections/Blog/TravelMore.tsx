import { useAppData } from "@/AppProvider";
import ArrowPagination from "@/components/ArrowPagination";
import CategoryType from "@/types/CategoryType";
import PostType from "@/types/PostType.ts";
import { CSSProperties, ChangeEvent, useEffect, useState } from "react";
import SlideVertical from "@/components/SlideVertical";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import IconSearch from "./../../assets/icons/IconSearch";

let TOTAL_POST_PER_SLIDE = 8;

type PostWithCategoryType = PostType & { category: CategoryType };
type TravelMoreProps = {
	posts: PostWithCategoryType[];
};

export default function TravelMore({ posts }: TravelMoreProps) {
	const [currentSlide, setCurrentSlide] = useState(1);
	const [totalSlide, setTotalSlide] = useState(0);
	const [runHeaderAnimation, setRunHeaderAnimation] = useState(true);
	const [runCardsAnimation, setRunCardsAnimation] = useState(true);
	const [search, setSearch] = useState("");
	const [searchedPosts, setSearchedPosts] =
		useState<PostWithCategoryType[]>(posts);

	const {
		articles: { travel_more },
		windowSize,
	} = useAppData();

	if (windowSize <= 768) {
		TOTAL_POST_PER_SLIDE = 4;
	}

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		setSearch(e.currentTarget.value);
		setRunHeaderAnimation(false);
		setRunCardsAnimation(false);
	}

	function initializeSlide() {
		setTotalSlide(() => {
			return Math.ceil(searchedPosts.length / TOTAL_POST_PER_SLIDE);
		});
		setCurrentSlide(1);
	}

	useEffect(() => {
		initializeSlide();
	}, [searchedPosts]);
	useEffect(() => {
		setSearchedPosts(() => {
			return posts.filter((post) => {
				const searchValue = search.toLowerCase().trim();
				return (
					post.title.toLowerCase().includes(searchValue) ||
					post.slug.toLowerCase().includes(searchValue) ||
					post.date.toLowerCase().includes(searchValue) ||
					post.description
						.replace(/<\/?[^>]+(>|$)/g, " ")
						.toLowerCase()
						.includes(searchValue) ||
					post.category.name.toLowerCase().includes(searchValue)
				);
			});
		});
	}, [search]);
	return (
		<section className="section-seperator main-section" id="travel_more">
			<section className="container">
				<header className="section-header">
					<SlideVertical runAnimation={runHeaderAnimation}>
						<h4 className="section-header-title">
							{travel_more.title}
						</h4>
						<h2 className="section-header-tagline">
							{travel_more.tagline}
						</h2>
					</SlideVertical>
				</header>

				<SlideVertical runAnimation={runHeaderAnimation}>
					<div className="search-icon-box">
						<IconSearch
							width={"24"}
							height={"24"}
							className="search-icon"
						/>
						<input
							type="text"
							placeholder="Search post.."
							value={search}
							onChange={handleInputChange}
						/>
					</div>
				</SlideVertical>

				<section
					className="article-cards"
					style={
						{
							"--slide": currentSlide - 1,
						} as CSSProperties
					}
				>
					<section className="article-cards-watcher">
						{new Array(totalSlide).fill(0).map((_, i) => (
							<section key={i} className="article-card-row">
								<SlideVertical
									order={2}
									triggerBySelf={false}
									runAnimation={runCardsAnimation}
								>
									{searchedPosts
										.slice(
											i * TOTAL_POST_PER_SLIDE,
											i * TOTAL_POST_PER_SLIDE +
												TOTAL_POST_PER_SLIDE
										)
										.map((post) => (
											<Link
												to={`/articles/${post.slug}`}
												className="no-hover"
												key={post.id}
											>
												<article
													className="article-card-horizontal"
													key={post.id}
												>
													<section className="article-card-image">
														<LazyLoadImage
															src={
																post.public_image
															}
															alt={`Post image - ${post.title}`}
														/>
													</section>
													<section className="article-card-content">
														<h3 className="article-card-title">
															{post.title}
														</h3>
														<p className="article-card-description">
															{post.description
																.replace(
																	/<\/?[^>]+(>|$)/g,
																	" "
																)
																.slice(0, 60)}
															{post.description.replace(
																/<\/?[^>]+(>|$)/g,
																" "
															).length < 60
																? ""
																: "..."}
														</p>

														<div className="post-info">
															<span className="post-category">
																{
																	post
																		.category
																		.name
																}
															</span>
															<p className="post-date">
																{post.date}
															</p>
														</div>
													</section>
												</article>
											</Link>
										))}
								</SlideVertical>
							</section>
						))}
					</section>
				</section>
				{searchedPosts.length > 0 ? (
					<section className="mt-1">
						<ArrowPagination
							totalPage={totalSlide}
							currentPage={currentSlide}
							setPage={(page) => {
								setCurrentSlide(page);
								setRunHeaderAnimation(false); // Ensure header animation does not re-run
							}}
						/>
					</section>
				) : <p style={{ textAlign: 'center' }}>No posts founded</p>}
			</section>
		</section>
	);
}
