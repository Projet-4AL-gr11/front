import {Post} from "./post.model";
import {Conversation} from "./conversation.model";
import {GroupMembership} from "./group_membership.model";
import {Media} from "./media.model";

export class Group {
  id: string;
  name: string;
  members: GroupMembership[];
  posts: Post[];
  conversation: Conversation;
  picture: Media;
}
