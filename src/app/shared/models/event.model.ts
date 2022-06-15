import {Group} from "./group.model";
import {Language} from "./language.model";
import {Media} from "./media.model";
import {User} from "./user.model";
import {Post} from "./post.model";
import {EventRanking} from "./event_ranking.model";
import {Exercise} from "./exercise.model";

export class Event {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participantsLimit: number;
  group: Group;
  languages: Language[];
  picture: Media;
  user: User;
  participants: User[];
  posts: Post[];
  isMember: Boolean = false;
  isOwner: Boolean = false;
  exercises: Exercise[];
  eventRanking: EventRanking[];
}
