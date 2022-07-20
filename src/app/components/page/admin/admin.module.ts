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

@NgModule({
  declarations: [
    CreateExerciseTemplateComponent,
    UpdateExerciseTemplateComponent,
    ListExerciseTemplateComponent,
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
  ],
  exports: [
    CreateExerciseTemplateComponent,
    UpdateExerciseTemplateComponent,
    ListExerciseTemplateComponent
  ]
})
export class AdminModule {
}
