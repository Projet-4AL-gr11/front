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
import {EventIdeComponent} from './event-ide/event-ide.component';
import {MatMenuModule} from "@angular/material/menu";
import {AdminIdeComponent} from "./admin-ide/admin-ide.component";
import { AdminIdeValidateComponent } from './admin-ide-validate/admin-ide-validate.component';
import { AdminIdeValidateBadCodeComponent } from './admin-ide-validate-bad-code/admin-ide-validate-bad-code.component';
import { LoaderComponent } from './loader/loader.component';


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
    MatMenuModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonCreatePostComponent,
    EventIdeComponent,
    AdminIdeComponent,
    SearchBarComponent,
    AdminIdeValidateComponent,
    AdminIdeValidateBadCodeComponent,
    LoaderComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonCreatePostComponent,
    EventIdeComponent,
    AdminIdeComponent,
    SearchBarComponent,
    AdminIdeValidateComponent,
    AdminIdeValidateBadCodeComponent,
    LoaderComponent,

  ],
})

export class SharedModule {
}
