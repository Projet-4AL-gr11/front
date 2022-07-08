import {Group} from "../../group.model";


export class PostDto {
  text: string;
  group?: Group;
  sharedEvent?: string;
  sharesPost?: string;
}
