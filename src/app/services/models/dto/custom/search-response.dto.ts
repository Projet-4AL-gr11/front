import {User} from "../../user.model";
import {Group} from "../../group.model";
import {Event} from "../../event.model";
import {Post} from "../../post.model";

export class SearchResponseDto {
  public users: User[];
  public events: Event[];
  public groups: Group[];
  public posts: Post[];
}
