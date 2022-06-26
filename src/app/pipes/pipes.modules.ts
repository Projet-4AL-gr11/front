import {NgModule} from "@angular/core";
import {PostShareCardComponent} from "../components/card/post-share-card/post-share-card.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ImageUrlPipe} from "./image-url/image-url.pipe";

@NgModule({
  declarations: [
    ImageUrlPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ImageUrlPipe,
  ]
})
export class PipesModules { }
