import {User} from "./user.model";
import {Event} from "./event.model";

export class EventRanking {
  id: string;
  user: User;
  event: Event;
  score: number;
}
