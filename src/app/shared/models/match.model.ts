import { MatchAction } from "./matchAction.model";
import { Team } from "./team.model";
import { Terrain } from "./terrain.model";
import { User } from "./user.model";

export class Match {
    _id!: string;
    start_date!: Date;
    end_date!: Date;
    team1!:Team;
    team2!:Team;
    goals!:MatchAction[];
    yellowCards!:MatchAction[];
    redCards!:MatchAction[];
    winner!:Team;
    terrain!:Terrain;
    //round, semi final, phase de poule ...
    type!:string;
    //on going, pending, finished
    state!:string;
    penalty!:Boolean;
    prolongation!:Boolean;
    manOfTheMatch!:User;
}