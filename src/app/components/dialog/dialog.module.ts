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
import {PostShareCardModule} from "../card/post-share-card/post-share-card.module";
import {DialogCreateEventComponent} from "./dialog-create-event/dialog-create-event.component";
import {DialogCreateGroupComponent} from "./dialog-create-group/dialog-create-group.component";
import {DialogCreatePostComponent} from "./dialog-create-post/dialog-create-post.component";
import {DialogReportComponent} from "./dialog-report/dialog-report.component";
import {DialogUpdateGroupComponent} from "./dialog-update-group/dialog-update-group.component";
import {DialogUpdateUserComponent} from "./dialog-update-user/dialog-update-user.component";


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
    PostShareCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [
    DialogCreateEventComponent,
    DialogCreateGroupComponent,
    DialogCreatePostComponent,
    DialogReportComponent,
    DialogUpdateGroupComponent,
    DialogUpdateUserComponent,
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
