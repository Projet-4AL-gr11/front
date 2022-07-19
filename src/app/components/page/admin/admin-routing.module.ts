import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../auth/login/login.component";
import {RegisterComponent} from "../auth/register/register.component";
import {NgModule} from "@angular/core";
import {CreateExerciseTemplateComponent} from "./create-exercise-template/create-exercise-template.component";
import {UpdateExerciseTemplateComponent} from "./update-exercise-template/update-exercise-template.component";
import {ListExerciseTemplateComponent} from "./list-exercise-template/list-exercise-template.component";

const routes: Routes = [
  {
    path: "admin",
    children: [
      {
        path: "createExerciseTemplate",
        component: CreateExerciseTemplateComponent
      },
      {
        path: "exerciseTemplate/:id",
        component: UpdateExerciseTemplateComponent
      },
      {
        path: "listExerciseTemplate",
        component: ListExerciseTemplateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
