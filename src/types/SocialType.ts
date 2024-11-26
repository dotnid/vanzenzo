import APIObjectType from "@/types/APIObjectType.ts";
export default interface SocialType extends APIObjectType {
    company_id: number;
    type: string;
    link: string;
    public_icon: string;
}
