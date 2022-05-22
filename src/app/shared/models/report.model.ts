import {User} from "./user.model";
import {Group} from "./group.model";
import {Post} from "./post.model";

export class Report {
  text: string;
  userReporter: User;
  reportedUser?: User;
  reportedGroup?: Group;
  reportedPost?: Post;
  reportedEvent?: Event;
}
