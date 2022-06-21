import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PostCardComponent} from "./post-card.component";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModules} from "../../../pipes/pipes.modules";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    PostCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PipesModules,
    MatMenuModule
  ],
  exports: [
    PostCardComponent,
  ]
})
export class PostCardModule { }
