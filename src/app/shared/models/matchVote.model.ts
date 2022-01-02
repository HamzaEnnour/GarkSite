import { Skills } from "./skills.model";
import { Team } from "./team.model";
import { User } from "./user.model";

export class MatchVote {
  _id!: string;
  voter!: User;
  voteType!: string;
  votedOnPlayer!: Skills;
  votedOnTeam!: Team;
  pace!: number;
  rating!: number;
  shooting!: number;
  passing!: number;
  dribbling!: number;
  defending!: number;
  physical!: number;
  vote_date!: Date;
}
