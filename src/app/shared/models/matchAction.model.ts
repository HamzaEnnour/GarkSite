import { Challenge } from "./challenge.model";
import { Match } from "./match.model";
import { Skills } from "./skills.model";
import { Team } from "./team.model";


export class MatchAction {
    _id!: string;
    player!:Skills;
    challenge!:Challenge;
    match!:Match;
    team!:Team;
    minutes!:number;
    type!:string;
}