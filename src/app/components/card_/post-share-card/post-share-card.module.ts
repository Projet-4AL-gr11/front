import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PostShareCardComponent} from "./post-share-card.component";
import {ImageUrlPipe} from "../../../pipes/image-url/image-url.pipe";
import {PipesModules} from "../../../pipes/pipes.modules";

@NgModule({
  declarations: [
    PostShareCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PipesModules
  ],
  exports: [
    PostShareCardComponent,
  ]
})
export class PostShareCardModule { }
