import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PipesModules} from "../../pipes/pipes.modules";
import {MatMenuModule} from "@angular/material/menu";
import {DialogCreateEventComponent} from "./dialog-create-event/dialog-create-event.component";
import {DialogCreateGroupComponent} from "./dialog-create-group/dialog-create-group.component";
import {DialogCreatePostComponent} from "./dialog-create-post/dialog-create-post.component";
import {DialogReportComponent} from "./dialog-report/dialog-report.component";
import {DialogUpdateGroupComponent} from "./dialog-update-group/dialog-update-group.component";
import {DialogUpdateUserComponent} from "./dialog-update-user/dialog-update-user.component";
import {CardsModule} from "../card/cards.module";
import {DialogCreateConversationComponent} from './dialog-create-conversation/dialog-create-conversation.component';
import {MatCardModule} from "@angular/material/card";
import {ConversationModule} from "../conversation/conversation.module";
import {MatNativeDateModule} from "@angular/material/core";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
    PipesModules,
    CardsModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    ConversationModule,
    FlexModule,
  ],
  declarations: [
    DialogCreateEventComponent,
    DialogCreateGroupComponent,
    DialogCreatePostComponent,
    DialogReportComponent,
    DialogUpdateGroupComponent,
    DialogUpdateUserComponent,
    DialogCreateConversationComponent,
  ],
  exports: [
    DialogCreateEventComponent,
    DialogCreateGroupComponent,
    DialogCreatePostComponent,
    DialogReportComponent,
    DialogUpdateGroupComponent,
    DialogUpdateUserComponent,
  ],
})
export class DialogModule {
}
