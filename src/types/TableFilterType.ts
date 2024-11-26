import APIObjectType from "@/types/APIObjectType.ts";
export default interface VisionType extends APIObjectType {
	name: string;
	slug: string;
	source: string;
}
