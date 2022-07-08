import {Group} from "./group.model";
import {Friendship} from "./friendship.model";
import {Message} from "./message.model";
import {User} from "./user.model";

export class Conversation {
  id: string;
  messages?: Message[];
  group?: Group;
  users?: User[]
  friendship?: Friendship;
  createdAt: Date;
  updatedAt: Date;
}
