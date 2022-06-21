import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModules} from "../../../pipes/pipes.modules";
import {CommentCardComponent} from "./comment-card.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    CommentCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PipesModules,
    MatButtonModule,
    MatMenuModule,
  ],
  exports: [
    CommentCardComponent,
  ]
})
export class CommentCardModule { }
