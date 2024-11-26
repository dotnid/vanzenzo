import APIObjectType from "@/types/APIObjectType.ts";
export default interface TeamMemberType extends APIObjectType {
	bio: string;
	name: string;
	occupation: string;
	profile_image: string;
	slug: string;
	public_profile_image: string;
}
