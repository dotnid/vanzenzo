import { useAppData } from "@/AppProvider";
import SlideVertical from "@/components/SlideVertical";
import CategoryType from "@/types/CategoryType";
import PostType from "@/types/PostType";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

type MainProps = {
	post: PostType & { category: CategoryType };
};

export default function Main({ post }: MainProps) {
	const {
		articles: { main },
	} = useAppData();

	return (
		<section className="main-section" id="articles-main">
			<section className="container">
				<SlideVertical order={2}>
					<h1 className="articles-main-title">{main.title}</h1>
					<p className="articles-main-description">
						{main.description}
					</p>

					<Link to={`/articles/${post.slug}`} className="no-hover">
						<article
							className="articles-main-highlight"
							style={
								{
									"--backgroundImage": `url(${post.public_image})`,
								} as CSSProperties
							}
						>
							<h3>{post.title}</h3>
							<p>
								{post.description.replace(
									/<\/?[^>]+(>|$)/g,
									" "
								)}
							</p>

							<div className="post-info">
								<span className="post-category">
									{post.category.name}
								</span>
								<p className="post-date">{post.date}</p>
							</div>
						</article>
					</Link>
				</SlideVertical>
			</section>
		</section>
	);
}
