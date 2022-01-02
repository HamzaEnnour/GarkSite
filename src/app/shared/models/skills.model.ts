import { Challenge } from "./challenge.model";
import { Match } from "./match.model";
import { MatchAction } from "./matchAction.model";
import { MatchVote } from "./matchVote.model";
import { Story } from "./story.model";
import { Team } from "./team.model";
import { User } from "./user.model";

export class Skills {
    _id!: string;
    //manOfTheMatch!:number;
    pace!:number;
    shooting!:number;
    passing!:number;
    dribbling!:number;
    defending!:number;
    physical!:number;
    score!:number;
    role!:string;
    player!:User;
    nationality!:any;
    teams!:Team[];
    favoriteteams!:Team[];
    favoriteplayers!:Skills[];
    age!:number;
    description!:string;
    xp!:number;
    height!:number;
    weight!:number;
    bestTeamWorld!:any;
    bestTeamLocal!:any;
    bestPlayerWorld!:any;
    bestPlayerLocal!:any;
    ///////////////////////////////addition
    dossart!:number;
    rating!:number;
    goals!:MatchAction[];
    yellowCards!:MatchAction[];
    redCards!:MatchAction[];
    votes!:MatchVote[];
    manOfTheMatch!:Match[];
    manOfTheTournement!:Challenge[];
    followers!:Skills[];
    matches!:Match[];
    stories!:Story[];
    notifications!:Notification[];
}