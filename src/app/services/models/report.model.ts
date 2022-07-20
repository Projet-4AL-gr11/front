import {User} from "./user.model";
import {Group} from "./group.model";
import {Post} from "./post.model";
import {Event} from "./event.model";
import {Exercise} from "./exercise.model";
import {Comment} from "./comment.model";

export class Report {
  id: string;
  text: string;
  userReporter: User;
  reportedUser?: User;
  reportedGroup?: Group;
  reportedPost?: Post;
  reportedEvent?: Event;
  reportedExercise?: Exercise;
  reportedComment?: Comment;
  nbReport?: number;
}
