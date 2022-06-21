import {User} from "./user.model";
import {Group} from "./group.model";

export class GroupRequest {
  user: User;
  group: Group;
}
