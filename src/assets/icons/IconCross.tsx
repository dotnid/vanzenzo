import { IconPropsType } from "@/types/IconPropsType";

export default function IconCross({
	width = "25",
	height = "25",
}: IconPropsType) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 25 25"
			fill="none"
		>
			<path
				d="M18.75 6.25L6.25 18.75"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M6.25 6.25L18.75 18.75"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
