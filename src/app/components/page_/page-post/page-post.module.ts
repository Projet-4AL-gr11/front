import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagePostRoutingModule } from './page-post-routing.module';
import { PagePostComponent } from './page-post.component';
import {SharedModule} from "../../../shared/shared.module";
import {PostModule} from "../../card_/post/post.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommentCardModule} from "../../card_/comment-card/comment-card.module";
import {PipesModules} from "../../../pipes/pipes.modules";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    PagePostComponent
  ],
  imports: [
    CommonModule,
    PagePostRoutingModule,
    SharedModule,
    PostModule,
    FontAwesomeModule,
    CommentCardModule,
    PipesModules,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatMenuModule
  ],
  exports: [
    PagePostComponent
  ]
})
export class PagePostModule { }
