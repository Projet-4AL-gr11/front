import {User} from "./user.model";

export class Report {
  id: string;
  text: string;
  userReporter: User;
  reportedUser?: string;
  reportedGroup?: string;
  reportedPost?: string;
  reportedEvent?: string;
  reportedExercise?: string;
  reportedComment?: string;
  nbReport?: number;
}
