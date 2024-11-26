import IconChevronLeft from "@/assets/icons/IconChevronLeft";
import IconChevronRight from "@/assets/icons/IconChevronRight";
type ArrowPaginationProps = {
	totalPage: number;
	currentPage: number;
	setPage: (e: number) => void;
};

export default function ArrowPagination({
	totalPage,
	currentPage,
	setPage,
}: ArrowPaginationProps) {
	return (
		<section className="arrow-pagination">
			<button
				aria-label="Prev Slide"
				className="left-page-button"
				disabled={currentPage == 1}
				onClick={() =>
					currentPage != 1 ? setPage(currentPage - 1) : null
				}
			>
				<IconChevronLeft width={"24"} height={"24"} />
			</button>
			<div className="page-identifiers">
				{new Array(totalPage).fill(0).map((_, i) => (
					<span
						key={i}
						className={`${currentPage == i + 1 ? "active" : ""}`}
					></span>
				))}
			</div>
			<button
				aria-label="Next Slide"
				className="right-page-button"
				disabled={currentPage == totalPage}
				onClick={() =>
					currentPage != totalPage ? setPage(currentPage + 1) : null
				}
			>
				<IconChevronRight width={"24"} height={"24"} />
			</button>
		</section>
	);
}
