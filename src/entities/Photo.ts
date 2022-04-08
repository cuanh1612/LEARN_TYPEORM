import { Column, Entity } from "typeorm";
import { Content } from "./utils/Content";

@Entity()
export class Photo extends Content {
    @Column()
    size: string
}