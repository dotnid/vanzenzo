import React, {
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import PageContentType from "@/types/PageContentType";
import fetching from "@/utils/fetching";
import LoadingAnimation from "./components/LoadingAnimation";
import { useLocation } from "react-router-dom";
type AppProviderProps = {
	children: ReactNode;
};

export const AppDataContext = React.createContext({} as any);
export const DataContext = React.createContext({} as any);

export function useAppData() {
	return useContext(AppDataContext);
}

export function useData() {
	return useContext(DataContext);
}

export default function AppProvider({ children }: AppProviderProps) {
	const [pageContent, setPageContent] = useState<PageContentType>(
		{} as PageContentType
	);

	const { pathname } = useLocation();

	const [windowSize, setWindowSize] = useState(window.innerWidth);
	const [data, setData] = useState({} as { [key: string]: any });
	const endpoints = [
		"pinpoints",
		"visions",
		"benefits",
		"products",
		"comodities",
		"team_members",
		"clients",
		"articles",
		"certifications",
		"my_company",
		"catalog",
		"articles?get=all",
		"socials",
	];

	async function getData() {
		const pageContent = await fetching("get", "page_contents");
		setPageContent(pageContent.data.page_contents);

		endpoints.forEach(async (endpoint) => {
			try {
				const fetchingData = await fetching("get", endpoint);
				if (fetchingData.status == 200) {
					let accessKey = endpoint;
					if (
						endpoint == "articles" ||
						endpoint == "articles?get=all"
					) {
						accessKey = "posts";
					} else if (endpoint == "my_company") {
						accessKey = "company";
					} else if (endpoint == "catalog") {
						accessKey = "products";
					}

					setData((prev) => ({
						...prev,
						[endpoint == "articles?get=all" ? "blog" : endpoint]:
							fetchingData.data[accessKey],
					}));
				} else {
					console.error(`Failed to fetch ${endpoint} data`);
				}
			} catch (error: any) {
				console.error(
					`Error fetching ${endpoint} data:`,
					error.message
				);
			}
		});
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		function resize() {
			setWindowSize(window.innerWidth);
		}
		document.addEventListener("resize", resize);
		return () => document.removeEventListener("resize", resize);
	}, []);

	function getRenderCondition() {
		if (pathname.match(/^\/+$/)) {
			return (
				!pageContent.main ||
				!data.pinpoints ||
				!data.visions ||
				!data.benefits ||
				!data.products ||
				!data.comodities ||
				!data.clients ||
				!data.team_members ||
				!data.articles ||
				!data.certifications ||
				!data.my_company ||
				!data.socials
			);
		} else if (pathname.match(/^\/products(\/.*)?$/)) {
			return (
				!pageContent.products ||
				!data.catalog ||
				!data.my_company ||
				!data.socials
			);
		} else if (pathname.match(/^\/articles(\/.*)?$/)) {
			return (
				!pageContent.articles ||
				!data.blog ||
				!data.my_company ||
				!data.socials
			);
		}
	}

	return (
		<>
			{getRenderCondition() ? (
				<LoadingAnimation />
			) : (
				<AppDataContext.Provider
					value={{ ...pageContent, ...{ windowSize } }}
				>
					<DataContext.Provider value={data}>
						{children}
					</DataContext.Provider>
				</AppDataContext.Provider>
			)}
		</>
	);
}
