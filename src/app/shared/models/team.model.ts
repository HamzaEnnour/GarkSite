import { Challenge } from "./challenge.model";
import { Match } from "./match.model";
import { MatchAction } from "./matchAction.model";
import { Skills } from "./skills.model";

export class Team {
    _id!: string;
    name!:string;
    //Y7eb 3bad teb3athlou request bech tod5el ou non
    private!:Boolean;
    image!:string;
    //Univiestié, clubs(academy), sport travail, amateur...
    categorie!:string;
    capitaine!:Skills;
    titulares!:Skills[];
    substitutes!:Skills[];
    points!:number;
    rating!:number;
    nationality!:string;
    date_created!:Date;
    description!:string;
    /// addition
    //chakaka (double mta3 team kamel)  
    moneybox!:number;
    draws!:Match[];
    victories!:Match[];
    defeats!:Match[];
    votes!:MatchAction[];
    participations!:Challenge[];
    champions!:Challenge[];
    secondPrizes!:Challenge[];
    prizeCollected!:number;
}
