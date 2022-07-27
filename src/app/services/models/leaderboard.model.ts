import {Exercise} from "./exercise.model";
import {User} from "./user.model";
import {Language} from "./language.model";

export class Leaderboard {
  id: string;
  userEntry: string;
  createdDate: Date;
  user: User;
  exercise: Exercise;
  language: Language;
  timerScore: number;
  ranking: number;
}
