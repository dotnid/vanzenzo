import APIObjectType from "@/types/APIObjectType.ts";
export default interface CertificationType extends APIObjectType {
	public_image: string;
	description: string;
	image: string;
	slug: string;
	title: string;
}
