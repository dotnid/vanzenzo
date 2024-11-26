import APIObjectType from "@/types/APIObjectType.ts";
export default interface ClientType extends APIObjectType {
	logo: string;
	public_logo: string;
	name: string;
	slug: string;
}
