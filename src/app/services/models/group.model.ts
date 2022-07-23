import {Post} from "./post.model";
import {Conversation} from "./conversation.model";
import {GroupMembership} from "./group_membership.model";
import {Media} from "./media.model";
import {Event} from "./event.model";
import {GroupRequest} from "./GroupRequest.model";
import {User} from "./user.model";

export class Group {
  id: string;
  name: string;
  members: GroupMembership[];
  posts: Post[];
  conversation: Conversation;
  picture: Media;
  events: Event[];
  bannerPicture: Media;
  isAdmin: boolean;
  isOwner: boolean;
  groupRequests: GroupRequest[];
  isFollower: boolean;
  followers: User[];
}
