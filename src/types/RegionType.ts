import APIObjectType from "@/types/APIObjectType.ts";
export default interface RegionType extends APIObjectType {
	description: string;
	name: string;
	slug: string;
	type: string;
}
