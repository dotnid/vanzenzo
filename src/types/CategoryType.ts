import APIObjectType from "@/types/APIObjectType.ts";
export default interface CategoryType extends APIObjectType {
	slug: string;
	name: string;
}
