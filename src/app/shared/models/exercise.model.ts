import {ExerciseTemplate} from "./erxercise_template.model";

export class Exercise {
  id: string;
  name: string;
  startingDate: Date;
  endingDate: Date;
  exerciseTemplate: ExerciseTemplate;
}
