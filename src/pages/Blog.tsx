import { useAppData, useData } from "@/AppProvider";
import Latest from "@/page-sections/Blog/Latest";
import Main from "@/page-sections/Blog/Main";
import TravelMore from "@/page-sections/Blog/TravelMore";
import CategoryType from "@/types/CategoryType";
import PostType from "@/types/PostType";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function Blog() {
	const data = useAppData();
	const { blog: posts }: { blog: (PostType & { category: CategoryType })[] } =
		useData();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>
					PT Crescentia Indo Global | {data.articles.main.title}
				</title>
				<link
					rel="description"
					content={data.articles.main.description}
				/>
			</Helmet>
			{posts.length > 0 && (
				<>
					<Main post={posts[0]} />
					<Latest posts={posts.slice(0, 4)} />
					<TravelMore posts={posts} />
				</>
			)}
		</>
	);
}
