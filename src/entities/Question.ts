import { Column } from "typeorm";
import { Content } from "./utils/Content";

export class Question extends Content {
  @Column()
  answersCount: number;
}
