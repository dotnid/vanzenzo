import {
	ReactNode,
	Children,
	cloneElement,
	useRef,
	useLayoutEffect,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SlideVerticalProps = {
	children: ReactNode;
	order?: number;
	triggerBySelf?: boolean; // if set to false then it is triggered by the first element on the list
	runAnimation?: boolean;
	toDirection?: "bottom" | "top";
	moveByProperty?: "translation" | "positioning";
};

export default function SlideVertical({
	children,
	order = 0,
	triggerBySelf = true,
	runAnimation = true,
	toDirection = "bottom",
	moveByProperty = "translation",
}: SlideVerticalProps) {
	const childrenRefs = useRef<(HTMLElement | null)[]>([]);

	useLayoutEffect(() => {
		if (!ScrollTrigger || !runAnimation) return;

		const triggers: gsap.core.Tween[] = [];

		childrenRefs.current.forEach((child, index) => {
			if (child) {
				const toAnimation: gsap.TweenVars = {
					opacity: 1,
					[moveByProperty == "translation" ? "y" : "top"]: 0,
					duration: 0.8,
					delay: (order + index) * 0.25,
					ease: "power2.out",
					scrollTrigger: {
						trigger: triggerBySelf
							? child
							: childrenRefs.current[0],
						start: "top 80%",
						toggleActions: "play none none none",
					},
				};

				const animation = gsap.fromTo(
					child,
					{
						opacity: 0,
						[moveByProperty == "translation" ? "y" : "top"]:
							toDirection == "bottom" ? -50 : 50,
					},
					toAnimation
				);
				triggers.push(animation);
			}
		});

		return () => {
			triggers.forEach((trigger) => trigger.scrollTrigger?.kill());
			ScrollTrigger.refresh();
		};
	}, [children, order, triggerBySelf, runAnimation]);

	return (
		<>
			{Children.map(children, (child, index) =>
				cloneElement(child as React.ReactElement, {
					ref: (el: HTMLElement) =>
						(childrenRefs.current[index] = el),
				})
			)}
		</>
	);
}
