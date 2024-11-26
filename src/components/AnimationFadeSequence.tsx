import React, {
	ReactNode,
	useEffect,
	useRef,
	Children,
	cloneElement,
} from "react";
import gsap from "gsap";

type AnimationFadeSequenceProps = {
	children: ReactNode;
};

export default function AnimationFadeSequence({
	children,
}: AnimationFadeSequenceProps) {
	const childrenRefs = useRef<(HTMLElement | null)[]>([]);

	useEffect(() => {
		const tl = gsap.timeline({ repeat: -1 }); // repeat: -1 makes the animation loop infinitely

		childrenRefs.current.forEach((child) => {
			if (child) {
				tl.fromTo(
					child,
					{ opacity: 0 },
					{ opacity: 1, duration: 1, ease: "power2.inOut" }
				).to(child, {
					opacity: 0,
					duration: 1,
					ease: "power2.inOut",
				});
			}
		});
	}, []);

	return (
		<>
			{Children.map(children, (child, index) =>
				cloneElement(child as React.ReactElement, {
					ref: (el: HTMLDivElement) =>
						(childrenRefs.current[index] = el),
				})
			)}
		</>
	);
}
