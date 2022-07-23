import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {CreateExerciseTemplateComponent} from "./exerciseTemplate/create-exercise-template/create-exercise-template.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { UpdateExerciseTemplateComponent } from './exerciseTemplate/update-exercise-template/update-exercise-template.component';
import { ListExerciseTemplateComponent } from './exerciseTemplate/list-exercise-template/list-exercise-template.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ReportListEventComponent } from './report/report-list-event/report-list-event.component';
import { ReportListGroupComponent } from './report/report-list-group/report-list-group.component';
import { ReportListPostComponent } from './report/report-list-post/report-list-post.component';
import { ReportListUserComponent } from './report/report-list-user/report-list-user.component';
import { ReportListCommentComponent } from './report/report-list-comment/report-list-comment.component';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { ReportListExerciseComponent } from './report/report-list-exercise/report-list-exercise.component';
import {SharedModule} from "../../shared/shared.module";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    CreateExerciseTemplateComponent,
    UpdateExerciseTemplateComponent,
    ListExerciseTemplateComponent,
    ReportListEventComponent,
    ReportListGroupComponent,
    ReportListPostComponent,
    ReportListUserComponent,
    ReportListCommentComponent,
    ReportListExerciseComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    //
    AdminRoutingModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    MatSelectModule,
  ],
  exports: [
    CreateExerciseTemplateComponent,
    UpdateExerciseTemplateComponent,
    ListExerciseTemplateComponent,
    ReportListEventComponent,
    ReportListGroupComponent,
    ReportListPostComponent,
    ReportListUserComponent,
    ReportListCommentComponent,
  ]
})
export class AdminModule {
}
