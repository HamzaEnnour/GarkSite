import { Availability } from "./availability.model";

export class Terrain {
    _id!: string;
    name!: string;
    localisation!: string;
    image!: string;
    availabilities!: Availability;

}