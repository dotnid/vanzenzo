import IconCross from "@/assets/icons/IconCross";
import { ReactNode, SyntheticEvent } from "react";
import SlideVertical from "./SlideVertical";

type ModalProps = {
	title: string;
	children: ReactNode;
	closeModal: () => void;
};
export default function Modal({ title, children, closeModal }: ModalProps) {
	function closeModalPopup(e: SyntheticEvent) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}

	return (
		<section id="modal" onClick={closeModalPopup}>
			<SlideVertical order={1}>
				<section className="modal-card">
					<header className="modal-header">
						<h3>{title}</h3>
						<span
							className="modal-close"
							onClick={() => closeModal()}
						>
							<IconCross width="25" height="25" />
						</span>
					</header>
					<article className="modal-content">{children}</article>
				</section>
			</SlideVertical>
		</section>
	);
}
