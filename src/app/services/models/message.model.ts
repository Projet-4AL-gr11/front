import {User} from "./user.model";
import {Conversation} from "./conversation.model";

export class Message {
  id: string;
  content: string;
  author: User;
  conversation: Conversation;
  createdAt: Date;
  updatedAt: Date;
}


export class MessageDto {
  content: string;
  conversation: Conversation;
}
