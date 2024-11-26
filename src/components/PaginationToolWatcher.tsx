import IconChevronLeft from "../assets/icons/IconChevronLeft";
import IconChevronRight from "../assets/icons/IconChevronRight";

type PaginationToolsWatcher = {
	MAX_PAGE_ON_PAGINATION: number;
	setPage: Function;
	currentPage: number;
	maxPage: number;
};
export default function PaginationToolsWatcher({
	MAX_PAGE_ON_PAGINATION = 5,
	setPage,
	currentPage,
	maxPage,
}: PaginationToolsWatcher) {
	return (
		<section className="pagination-tools-watcher">
			<section className="btn-split">
				<button
					aria-label="Previous Page"
					onClick={() => setPage("previous")}
					className={`${currentPage == 1 ? "inactive" : ""}`}
					disabled={currentPage == 1}
				>
					<IconChevronLeft width={"25"} height={"25"} />
				</button>
				{new Array(
					MAX_PAGE_ON_PAGINATION > maxPage
						? maxPage
						: MAX_PAGE_ON_PAGINATION
				)
					.fill(0)
					.map((_, i) => {
						let page = i + 1;
						const pageMinThreshold =
							MAX_PAGE_ON_PAGINATION -
							Math.floor(MAX_PAGE_ON_PAGINATION / 2);
						const pageMaxThreshold =
							maxPage - Math.floor(MAX_PAGE_ON_PAGINATION / 2);
						let currentPageToWatch = currentPage;
						if (currentPageToWatch >= pageMaxThreshold) {
							currentPageToWatch = pageMaxThreshold;
						}

						if (currentPageToWatch > pageMinThreshold) {
							page += currentPageToWatch - pageMinThreshold;
						}

						return (
							<button
								aria-label={`Page ${currentPage}`}
								onClick={() => setPage(page)}
								key={i}
								className={`${
									page == currentPage ? "active" : ""
								}`}
							>
								{page}
							</button>
						);
					})}
				<button
					aria-label="Next Page"
					onClick={() => setPage("next")}
					disabled={currentPage == maxPage}
					className={`${currentPage == maxPage ? "inactive" : ""}`}
				>
					<IconChevronRight width={"25"} height={"25"} />
				</button>
			</section>
		</section>
	);
}
