import APIObjectType from "@/types/APIObjectType.ts";
export default interface PostType extends APIObjectType {
	public_image: string;
	description: string;
	image: string;
	slug: string;
	title: string;
	category_id: number;
	date: string;
}
