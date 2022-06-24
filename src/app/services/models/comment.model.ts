import {Media} from "./media.model";
import {User} from "./user.model";

export class Comment {

  id: string;
  creator: User;
  text: string;
  medias: Media[];
  createdAt: Date;
  deleteAt: Date;
}
