import {Message} from "@angular/compiler/src/i18n/i18n_ast";
import {Group} from "./group.model";
import {Friendship} from "./friendship.model";

export class Conversation {
  id: string;
  messages: Message[];
  group?: Group;
  friendship?: Friendship;
}
