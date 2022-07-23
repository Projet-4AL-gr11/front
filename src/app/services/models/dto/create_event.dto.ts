import {ExerciseTemplate} from "../erxercise_template.model";
import {Group} from "../group.model";

export class CreateEventDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  exerciseTemplates: ExerciseTemplate[];
  group?: Group;
}
