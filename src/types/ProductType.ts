import APIObjectType from "@/types/APIObjectType.ts";
export default interface VisionType extends APIObjectType {
	public_image: string;
	description: string;
	image: string;
	slug: string;
	name: string;
}




