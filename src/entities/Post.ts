import { Column } from "typeorm";
import { Content } from "./utils/Content";

export class Post extends Content {
  @Column()
  viewCount: number;
}
