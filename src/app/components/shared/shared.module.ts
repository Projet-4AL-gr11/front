import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {ButtonCreatePostComponent} from "./button-create-post/button-create-post.component";

import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ConversationModule} from "../conversation/conversation.module";
import {FlexModule} from "@angular/flex-layout";
import {SearchBarComponent} from './layout/search-bar/search-bar.component';
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { IdeComponent } from './ide/ide.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatBadgeModule,
    FontAwesomeModule,
    ConversationModule,
    FlexModule,
    MatOptionModule,
    MatAutocompleteModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonCreatePostComponent,
    IdeComponent,
    SearchBarComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonCreatePostComponent,
    IdeComponent,
  ],
})
export class SharedModule {
}
