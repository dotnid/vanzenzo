import { useAppData, useData } from "@/AppProvider";
import IconDownload from "@/assets/icons/IconDownload";
import ArrowPagination from "@/components/ArrowPagination";
import CertificationType from "@/types/CertificationType";
import { CSSProperties, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import SlideVertical from "@/components/SlideVertical";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Modal from "@/components/Modal";

let TOTAL_CERTIFICATION_PER_PAGE = 2;

export default function Certifications() {
	const [currentSlide, setCurrentSlide] = useState(1);
	const [totalSlide, setTotalSlide] = useState(0);
	const [runAnimation, setRunAnimation] = useState(true);
	const [runHeaderAnimation, setRunHeaderAnimation] = useState(true);
	const [modalOpened, setModalOpened] = useState(false);
	const [modalItem, setModalItem] = useState({} as CertificationType);

	const {
		main: { certification },
		windowSize,
	} = useAppData();

	const { certifications }: { certifications: CertificationType[] } =
		useData();

	async function downloadImage(path: string) {
		const response = await axios.get(
			`${import.meta.env.VITE_API_URL}/images/${path}`,
			{ responseType: "blob" }
		);
		saveAs(response.data, "image.png"); // Put your image URL here.
	}

	function openModal(certification: CertificationType) {
		setModalOpened(true);
		setModalItem(certification);
	}

	function closeModal() {
		setModalOpened(false);
		setModalItem({} as CertificationType);
	}

	useEffect(() => {
		setTotalSlide(() => {
			return Math.ceil(
				certifications.length / TOTAL_CERTIFICATION_PER_PAGE
			);
		});
	}, []);
	return (
		<>
			<section
				className="section-seperator main-section"
				id="certifications"
			>
				<section className="container">
					<header className="section-header">
						<SlideVertical runAnimation={runHeaderAnimation}>
							<h2 className="section-header-title">
								{certification.title}
							</h2>
							<h2 className="section-header-tagline">
								{certification.tagline}
							</h2>
						</SlideVertical>
					</header>
					<section
						className="certification-cards"
						style={
							{
								"--slide": currentSlide - 1,
							} as CSSProperties
						}
					>
						<section className="certification-cards-watcher">
							{new Array(totalSlide).fill(0).map((_, i) => (
								<section
									key={i}
									className="certification-card-row"
								>
									<SlideVertical
										runAnimation={runAnimation}
										order={2}
										triggerBySelf={!(windowSize <= 768)}
									>
										{certifications
											.slice(
												i *
													TOTAL_CERTIFICATION_PER_PAGE,
												i *
													TOTAL_CERTIFICATION_PER_PAGE +
													TOTAL_CERTIFICATION_PER_PAGE
											)
											.map((certification) => (
												<article
													style={{
														cursor: "pointer",
													}}
													className="certification-card"
													key={certification.id}
													onClick={() => {
														openModal(
															certification
														);
														setRunAnimation(false);
														setRunHeaderAnimation(
															false
														);
													}}
												>
													<section className="certification-card-image">
														<LazyLoadImage
															src={
																certification.public_image
															}
															alt={`Certification Image - ${certification.title}`}
														/>
													</section>
													<section className="certification-card-content">
														<h3>
															{
																certification.title
															}
														</h3>
														<p className="mb-05">
															{certification.description.slice(
																0,
																100
															)}
															{certification
																.description
																.length < 100
																? ""
																: "..."}
														</p>

														<button
															aria-label="Download"
															className="btn-square"
															onClick={() =>
																downloadImage(
																	certification.image
																)
															}
														>
															<IconDownload
																width={"24"}
																height={"24"}
															/>
														</button>
													</section>
												</article>
											))}
									</SlideVertical>
								</section>
							))}
						</section>
					</section>
					{certifications.length > TOTAL_CERTIFICATION_PER_PAGE && (
						<section className="mt-1">
							<ArrowPagination
								totalPage={totalSlide}
								currentPage={currentSlide}
								setPage={(page) => {
									setCurrentSlide(page);
									setRunHeaderAnimation(false);
								}}
							/>
						</section>
					)}
				</section>
			</section>
			{modalOpened && (
				<Modal closeModal={() => closeModal()} title="Certifications">
					<section className="certification-card-image mt-1">
						<LazyLoadImage
							src={modalItem.public_image}
							alt={`Certification Image - ${modalItem.title}`}
						/>
					</section>
					<section className="certification-card-content mt-05">
						<h3>{modalItem.title}</h3>
						<p>{modalItem.description}</p>

						<button
							aria-label="Download"
							className="btn-square mt-05"
							onClick={() => downloadImage(modalItem.image)}
						>
							<IconDownload width={"24"} height={"24"} />
						</button>
					</section>
				</Modal>
			)}
		</>
	);
}
