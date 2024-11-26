import CategoryType from "@/types/CategoryType";
import PostType from "@/types/PostType";
import fetching from "@/utils/fetching";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SlideVertical from "@/components/SlideVertical";
import IconChevronLeft from "@/assets/icons/IconChevronLeft";
import parse from "html-react-parser";
import { Helmet } from "react-helmet-async";
import LoadingAnimation from "@/components/LoadingAnimation";

type PostWithCategoryType = PostType & { category: CategoryType };

export default function SinglePost() {
	const { slug } = useParams();
	const navigate = useNavigate();

	const [post, setPost] = useState<PostWithCategoryType>(
		{} as PostWithCategoryType
	);
	const [relatedPosts, setRelatedPosts] = useState<PostWithCategoryType[]>(
		[]
	);

	async function getData() {
		const postData = await fetching("get", `articles/${slug}`);
		if (postData.status != 200) {
			navigate("/articles");
			return;
		}
		const thePost = postData.data.post;
		const relatedPostsData = await fetching(
			"get",
			`articles?get=all&category=${thePost.category.slug}`
		);
		if (relatedPostsData.status != 200) return;
		setPost(thePost);
		setRelatedPosts(relatedPostsData.data.posts);
	}

	useEffect(() => {
		setPost({} as PostWithCategoryType);
		getData();
	}, [slug]);

	if (Object.keys(post).length <= 0) return <LoadingAnimation />;

	return (
		<section className="main-section container" id="single-post">
			<Helmet>
				<meta charSet="utf-8" />
				<title>{post.title}</title>
				<link
					rel="description"
					content=" Discover a wide range of Indonesia products in our comprehensive catalog. From traditional crafts to modern goods, find the best of Indonesia here."
				/>
			</Helmet>
			<SlideVertical order={1}>
				<section className="post">
					<Link to="/articles" className="back-link">
						<IconChevronLeft width={"24"} height={"24"} />
						Back
					</Link>
					<section className="post-image">
						<img
							src={post.public_image}
							alt={`Post image - ${post.title}`}
						/>
					</section>
					<h1 className="post-title">{post.title}</h1>
					<span className="post-category">{post.category.name}</span>
					<p className="post-description">
						{parse(post.description)}
					</p>
				</section>
			</SlideVertical>
			<SlideVertical order={1}>
				<section className="related-posts">
					<h3>Other Related Category Posts</h3>
					{relatedPosts.map(
						(p) =>
							post.id != p.id && (
								<Link
									to={`/articles/${p.slug}`}
									className="no-hover"
									key={p.id}
								>
									<article
										className="article-card-horizontal"
										key={p.id}
									>
										<section className="article-card-image">
											<LazyLoadImage
												src={p.public_image}
												alt={`Post image - ${p.title}`}
											/>
										</section>
										<section className="article-card-content">
											<h3 className="article-card-title">
												{p.title}
											</h3>

											<p className="post-date">
												{p.date}
											</p>
										</section>
									</article>
								</Link>
							)
					)}
				</section>
			</SlideVertical>
		</section>
	);
}
