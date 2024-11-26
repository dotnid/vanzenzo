import APIObjectType from "@/types/APIObjectType.ts";
export default interface ComodityType extends APIObjectType {
	icon: string;
	name: string;
	slug: string;
    public_icon: string;
}
