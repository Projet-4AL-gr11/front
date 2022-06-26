import {Group} from "./group.model";
import {Friendship} from "./friendship.model";
import {Message} from "./message.model";

export class Conversation {
  id: string;
  messages: Message[];
  group?: Group;
  friendship?: Friendship;
  createdAt: Date;
  updatedAt: Date;
}
