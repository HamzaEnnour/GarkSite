import { Match } from "./match.model";
import { MatchAction } from "./matchAction.model";
import { MatchVote } from "./matchVote.model";
import { Story } from "./story.model";
import { Team } from "./team.model";
import { User } from "./user.model";

export class Notification {
    _id!: string;
    //manOfTheMatch!:number;
    notificationType!:string;
    from!:User;
    to!:User;
    seen!:Boolean;
    confirmed!:Boolean;
    created_at!:Date;
 
}

