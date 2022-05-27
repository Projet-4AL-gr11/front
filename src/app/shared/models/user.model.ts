import {Group} from "./group.model";
import {FriendRequest} from "./friend_request.model";
import {Media} from "./media.model";
import {Post} from "./post.model";
import {UserType} from "../enum/user_type.enum";
import {FriendRequestStatus} from "../enum/friendship_request_status.enum";
import {Event} from "./event.model";
import {EventRanking} from "./event_ranking.model";
import {Leaderboard} from "./leaderboard.model";

export class User {
  id: string;
  username: string;
  email?: string;
  bio?: string;
  isBlocked: boolean;
  blocksCurrentUser: boolean;
  currentHashedRefreshToken: string;
  userType: UserType;
  friendshipStatus: FriendRequestStatus;
  friends?: User[];
  createdEvents?: Event[];
  createdPosts?: Post[];
  likedPosts?: Post[];
  profilePicture?: Media;
  bannerPicture?: Media;
  eventsParticipation?: Event[];
  comments?: Comment[];
  friendRequests: FriendRequest[];
  sentFriendRequests: FriendRequest[];
  groups: Group[];
  leaderboards: Leaderboard[];
  eventRankings: EventRanking[];
}
