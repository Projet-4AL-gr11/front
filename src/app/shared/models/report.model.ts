import {User} from "./user.model";
import {Group} from "./group.model";
import {Post} from "./post.model";

export class Report {
  text: string;
  userReporter: User;
  reportedUser?: string;
  reportedGroup?: string;
  reportedPost?: string;
  reportedEvent?: string;
  reportedExercise?: string;
  reportedComment?: string;
}
