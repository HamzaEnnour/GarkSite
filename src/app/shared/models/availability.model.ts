import { Terrain } from "./terrain.model";

export class Availability {

    _id!: string;
    StartTime!: Date;
    EndTime!: Date;
    terrain!: Terrain;

    constructor(){
    }
}