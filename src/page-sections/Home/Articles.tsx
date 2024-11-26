import { useAppData, useData } from "@/AppProvider";
import ArrowPagination from "@/components/ArrowPagination";
import CategoryType from "@/types/CategoryType";
import PostType from "@/types/PostType.ts";
import { CSSProperties, useEffect, useState } from "react";
import SlideVertical from "@/components/SlideVertical";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

let TOTAL_POST_PER_SLIDE = 3;

export default function Products() {
	const [currentSlide, setCurrentSlide] = useState(1);
	const [runHeaderAnimation, setRunHeaderAnimation] = useState(true);
	const [totalSlide, setTotalSlide] = useState(0);

	const {
		main: { article },
		windowSize,
	} = useAppData();

	if (windowSize <= 768) {
		TOTAL_POST_PER_SLIDE = 2;
	}

	const {
		articles: posts,
	}: { articles: (PostType & { category: CategoryType })[] } = useData();

	useEffect(() => {
		setTotalSlide(() => {
			return Math.ceil(posts.length / TOTAL_POST_PER_SLIDE);
		});
	}, []);

	return (
		<section className="section-seperator main-section" id="articles">
			<section className="container">
				<header className="section-header">
					<SlideVertical runAnimation={runHeaderAnimation}>
						<h2 className="section-header-title">
							{article.title}
						</h2>
						<h2 className="section-header-tagline">
							{article.tagline}
						</h2>
						<Link to={article.button.link} className="btn mt-1">
							{article.button.text}
						</Link>
					</SlideVertical>
				</header>
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
									triggerBySelf={!(windowSize <= 768)}
								>
									{posts
										.slice(
											i * TOTAL_POST_PER_SLIDE,
											i * TOTAL_POST_PER_SLIDE +
												TOTAL_POST_PER_SLIDE
										)
										.map((post) => (
											<Link
												to={`articles/${post.slug}`}
												className="no-hover"
												key={post.id}
											>
												<article
													className="article-card"
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
													<h3 className="article-card-title">
														{post.title}
													</h3>
													<p className="article-card-description">
														{post.description
															.replace(
																/<\/?[^>]+(>|$)/g,
																" "
															)
															.slice(0, 150)}
														{post.description.replace(
															/<\/?[^>]+(>|$)/g,
															" "
														).length < 150
															? ""
															: "..."}
													</p>

													<div className="post-info">
														<span className="post-category">
															{post.category.name}
														</span>
														<p className="post-date">
															{post.date}
														</p>
													</div>
												</article>
											</Link>
										))}
								</SlideVertical>
							</section>
						))}
					</section>
				</section>
				{posts.length > TOTAL_POST_PER_SLIDE && (
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
			</section>
		</section>
	);
}
