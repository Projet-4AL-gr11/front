import {ExerciseTemplate} from "./erxercise_template.model";
import {Leaderboard} from "./leaderboard.model";

export class Exercise {
  id: string;
  name: string;
  startingDate: Date;
  endingDate: Date;
  code: string;
  description: string;
  exerciseTemplate: ExerciseTemplate;
  leaderboards: Leaderboard[];
}
