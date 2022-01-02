
import { Match } from "./match.model";
import { Team } from "./team.model";
import { Terrain } from "./terrain.model";
import {User} from "./user.model"
export class Challenge {
    id!: string;
    name!:string;
    StartTime!: Date;
    EndTime!: Date;
    DateCreated!: Date;
    maxNumberOfTeams!:number;
    matchDuration!:number;
    location!:string;
    description!:string;
    prize1!:number;
    prize2!:number;
    gain!:number;
    fees!:number;
    winner!:Team;
    teams!:Team[];
    matches!:Match[];
    //Univiestié, clubs(academy), sport travail, amateur...
    categorie!:string;
    //Championat, phase de poule, coupe 
    type!:string;
    playerPerTeam!:number;
    terrain!:Terrain;
    state!:string;
    image!:string;
    creator!:User;
     ///akther wa7ed ja man of the match
    manOfTheTournement!:User;
 
}


