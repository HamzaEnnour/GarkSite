import { User } from "./user.model";

export class Story {
    _id!: string;
    title!: string;
    description!: string;
    expired!:Boolean;
    content!: string;
    contentType!: string;
    creator!: User;
    likes!: User[];
    views!: User[];
    date_created!: Date;
}