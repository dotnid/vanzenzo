import { useState, useId, useMemo } from "react";
import IconChevronDown from "@/assets/icons/IconChevronDown";

type DropdownFilterProps = {
	title: string;
	items: string[];
	max?: number;
	type?: string;
	onFilter: Function;
	currentItem: string | string[];
	open?: boolean;
};
const FilterType = ["link", "checkbox", "radio"];
export default function DropdownFilter({
	title,
	items,
	max = 5,
	type = "link",
	onFilter,
	currentItem,
	open = false,
}: DropdownFilterProps) {
	if (!FilterType.includes(type)) {
		type = "link";
	}
	const componentId = useId();
	const [openDropdown, setOpenDropdown] = useState(open);
	const [openAll, setOpenAll] = useState(false);

	const itemValue = useMemo(() => currentItem, [currentItem]);

	function setItem(item: string) {
		let storeItemValue = itemValue;
		if (type == "checkbox") {
			if (itemValue.includes(item)) {
				storeItemValue = (itemValue as string[]).filter(
					(pI) => pI != item
				);
				onFilter(storeItemValue);
				return;
			}
			storeItemValue = [...itemValue, item];
			onFilter(storeItemValue);
		} else {
			storeItemValue = item;
			onFilter(storeItemValue);
		}
	}

	function toggleOpenAll() {
		setOpenAll((prevOpen) => !prevOpen);
	}

	function toggleOpenDropdown() {
		setOpenDropdown((prevOpen) => !prevOpen);
	}

	return (
		<section className="dropdown-filter">
			<header
				className="dropdown-filter-header"
				onClick={toggleOpenDropdown}
			>
				<h4>{title}</h4>
				<span className="dropdown-filter-icon">
					<IconChevronDown
						width={"20"}
						height={"20"}
						color={"#737373"}
					/>
				</span>
			</header>
			<section
				className={`dropdown-filter-items ${
					openDropdown ? "open" : ""
				}`}
			>
				{items
					.slice(0, openAll ? undefined : max)
					.map((item, index) => {
						if (type == "link")
							return (
								<button
									aria-label={item}
									onClick={() => setItem(item)}
									key={`${componentId} - ${index}`}
									className={`btn-link ${
										item == currentItem ? "current" : ""
									}`}
								>
									{item}
								</button>
							);

						return (
							<label
								aria-label={item}
								key={`${componentId}-${index}`}
								htmlFor={`${componentId}-${item}`}
								className="btn-link flex items-center gap-05"
							>
								{type == "checkbox" && (
									<>
										<input
											type="checkbox"
											style={{
												width: "15px",
												height: "15px",
											}}
											onChange={() => setItem(item)}
											checked={itemValue.includes(item)}
											id={`${componentId}-${item}`}
										/>
										<span className="btn-link">{item}</span>
									</>
								)}
								{type == "radio" && (
									<>
										<input
											type="radio"
											style={{
												width: "15px",
												height: "15px",
											}}
											name={`${componentId}-radio`}
											onChange={() => setItem(item)}
											checked={currentItem == item}
											id={`${componentId}-${item}`}
										/>
										<span className="btn-link">{item}</span>
									</>
								)}
							</label>
						);
					})}
				{items.length > 5 && (
					<button
						className="see-all"
						aria-label="See All"
						onClick={toggleOpenAll}
					>
						{openAll ? "See less" : "See all"}
					</button>
				)}
			</section>
		</section>
	);
}
