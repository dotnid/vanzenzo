import APIObjectType from "@/types/APIObjectType.ts";
import RegionType from "@/types/RegionType.ts";
import ComodityType from "@/types/ComodityType.ts";
export default interface PinpointType extends APIObjectType {
	is_active: number | Boolean;
	pos_x: number | string;
	pos_y: number | string;
	region: RegionType & { comodities: ComodityType[] };
	region_id?: number;
}
