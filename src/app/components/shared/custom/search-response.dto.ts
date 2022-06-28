import {User} from "../../../services/models/user.model";
import {Group} from "../../../services/models/group.model";
import {Event} from "../../../services/models/event.model";
import {Post} from "../../../services/models/post.model";

export class SearchResponseDto {
  public users: User[];
  public events: Event[];
  public groups: Group[];
  public posts: Post[];
}
