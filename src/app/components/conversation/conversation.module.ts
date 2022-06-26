import {NgModule} from "@angular/core";
import {ConversationComponent} from "./conversation/conversation.component";
import {ConversationBoxComponent} from "./conversation-box/conversation-box.component";
import {ConversationListComponent} from "./conversation-list/conversation-list.component";
import {MessageComponent} from "./message/message.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModules} from "../../pipes/pipes.modules";
import {ConversationCardComponent} from "./conversation-card/conversation-card.component";
import {ConversationBoxDirective} from "./conversation-directive/conversation-box.directive";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SelectUsersCardComponent } from './select-users-card/select-users-card.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout"
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    ConversationComponent,
    ConversationBoxComponent,
    ConversationListComponent,
    ConversationCardComponent ,
    MessageComponent,
    ConversationBoxDirective,
    SelectUsersCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PipesModules,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    BsDropdownModule,
    MatListModule
  ],
  exports: [
    ConversationComponent,
    ConversationBoxComponent,
    ConversationListComponent,
    ConversationCardComponent,
    MessageComponent,
    ConversationBoxDirective,
    SelectUsersCardComponent
  ]
})
export class ConversationModule { }
