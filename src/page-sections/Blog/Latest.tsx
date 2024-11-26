import { useAppData } from "@/AppProvider";
import CategoryType from "@/types/CategoryType";
import PostType from "@/types/PostType.ts";
import SlideVertical from "@/components/SlideVertical";
import SlideHorizontal from "@/components/SlideHorizontal";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

type LatestType = {
	posts: (PostType & { category: CategoryType })[];
};

export default function Latest({ posts }: LatestType) {
	const {
		articles: { latest },
	} = useAppData();
	return (
		<section className="section-seperator main-section" id="latest">
			<section className="container">
				<header className="section-header">
					<SlideVertical>
						<h4 className="section-header-title">{latest.title}</h4>
						<h2 className="section-header-tagline">
							{latest.tagline}
						</h2>
					</SlideVertical>
				</header>

				<section className="latest-cards">
					<section className="latest-main">
						{posts.length > 0 && (
							<SlideVertical order={1}>
								<Link
									to={`/articles/${posts[0].slug}`}
									className="no-hover"
								>
									<article className="article-card">
										<section className="article-card-image">
											<LazyLoadImage
												src={posts[0].public_image}
												alt={`Post image - ${posts[0].title}`}
											/>
										</section>
										<h3 className="article-card-title">
											{posts[0].title}
										</h3>
										<p className="article-card-description">
											{posts[0].description
												.replace(/<\/?[^>]+(>|$)/g, " ")
												.slice(0, 250)}
											{posts[0].description.replace(
												/<\/?[^>]+(>|$)/g,
												" "
											).length < 250
												? ""
												: "..."}
										</p>

										<div className="post-info">
											<span className="post-category">
												{posts[0].category.name}
											</span>
											<p className="post-date">
												{posts[0].date}
											</p>
										</div>
									</article>
								</Link>
							</SlideVertical>
						)}
					</section>
					<section className="latest-sub">
						<SlideHorizontal order={2} triggerBySelf={false}>
							{posts.slice(1, 4).map((post) => (
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
												src={post.public_image}
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
													{post.category.name}
												</span>
												<p className="post-date">
													{post.date}
												</p>
											</div>
										</section>
									</article>
								</Link>
							))}
						</SlideHorizontal>
					</section>
				</section>
			</section>
		</section>
	);
}
