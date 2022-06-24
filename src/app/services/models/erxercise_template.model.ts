import {Language} from "./language.model";

export class ExerciseTemplate {
  id: string;
  name: string;
  language: Language;
  description?: string;
}
