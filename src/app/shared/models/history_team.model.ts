import { Skills } from "./skills.model";
import { Team } from "./team.model";

export class HistoryTeam {
    _id!: string;
    team!: Team;
    // join , leave , creation
    action!:string;
    user!:Skills;
    date!: Date;
    description!: string;
}