import {NgModule} from "@angular/core";
import {LoginComponent} from "../auth/login/login.component";
import {RegisterComponent} from "../auth/register/register.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthRoutingModule} from "../auth/auth-routing.module";
import {CreateExerciseTemplateComponent} from "./create-exercise-template/create-exercise-template.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { UpdateExerciseTemplateComponent } from './update-exercise-template/update-exercise-template.component';
import { ListExerciseTemplateComponent } from './list-exercise-template/list-exercise-template.component';
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
    //
    AdminRoutingModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  exports: [
    CreateExerciseTemplateComponent,
    UpdateExerciseTemplateComponent,
  ]
})
export class AdminModule {
}
