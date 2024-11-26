import APIObjectType from "@/types/APIObjectType.ts";
export default interface CompanyType extends APIObjectType {
	about: string;
	address: string;
	logo: string;
	public_logo: string;
	name: string;
	phone: string;
    slug: string;
	iframe_src: string;
}
