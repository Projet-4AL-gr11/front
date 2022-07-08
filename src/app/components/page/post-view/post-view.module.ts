import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostViewRoutingModule} from './post-view-routing.module';
import {PostViewComponent} from './post-view.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModules} from "../../../pipes/pipes.modules";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {CardsModule} from "../../card/cards.module";
import {SharedModule} from "../../shared/shared.module";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    PostViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardsModule,
    FontAwesomeModule,
    PipesModules,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,

    FlexModule,
    PostViewRoutingModule,
  ],
  exports: [
    PostViewComponent,
  ]
})
export class PostViewModule {
}
