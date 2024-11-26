import { IconPropsType } from "@/types/IconPropsType.ts";

export default function IconChevronRight({
	width = "20",
	height = "20",
}: IconPropsType) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
		>
			<path
				d="M8.33331 6.66669L11.6666 10L8.33331 13.3334"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
