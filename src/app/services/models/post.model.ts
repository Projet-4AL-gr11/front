import {User} from "./user.model";
import {Media} from "./media.model";
import {Group} from "./group.model";
import {Event} from "./event.model";
import {Comment} from "./comment.model";
import {Leaderboard} from "./leaderboard.model";

export class Post {
  id: string;
  creator: User;
  group?: Group;
  text: string;
  likes: User[];
  sharedPosts: Post[];
  sharesPost: Post;
  comments: Comment[];
  medias: Media[];
  sharedEvent: Event;
  sharedLeaderboard: Leaderboard;
  createdAt: Date;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  isLiked: boolean;
}
