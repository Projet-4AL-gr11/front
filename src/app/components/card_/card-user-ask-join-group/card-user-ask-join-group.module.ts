import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModules} from "../../../pipes/pipes.modules";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {CardUserAskJoinGroupComponent} from "./card-user-ask-join-group.component";

@NgModule({
  declarations: [
    CardUserAskJoinGroupComponent,
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
    CardUserAskJoinGroupComponent,
  ]
})
export class CardUserAskJoinGroupModule { }
