import {NgModule} from "@angular/core";
import {UserCardComponent} from "../user-card/user-card.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModules} from "../../../pipes/pipes.modules";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {EventCardComponent} from "./event-card.component";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    EventCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PipesModules,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
  ],
  exports: [
    EventCardComponent,
  ]
})
export class EventCardModules { }
