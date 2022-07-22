import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CreateExerciseTemplateComponent} from "./exerciseTemplate/create-exercise-template/create-exercise-template.component";
import {UpdateExerciseTemplateComponent} from "./exerciseTemplate/update-exercise-template/update-exercise-template.component";
import {ListExerciseTemplateComponent} from "./exerciseTemplate/list-exercise-template/list-exercise-template.component";
import {ReportListCommentComponent} from "./report/report-list-comment/report-list-comment.component";
import {ReportListEventComponent} from "./report/report-list-event/report-list-event.component";
import {ReportListExerciseComponent} from "./report/report-list-exercise/report-list-exercise.component";
import {ReportListGroupComponent} from "./report/report-list-group/report-list-group.component";
import {ReportListUserComponent} from "./report/report-list-user/report-list-user.component";
import {ReportListPostComponent} from "./report/report-list-post/report-list-post.component";

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
      },
      {
        path: "listCommentReport",
        component: ReportListCommentComponent
      },
      {
        path: "listEventReport",
        component: ReportListEventComponent
      },
      {
        path: "listExerciseReport",
        component: ReportListExerciseComponent
      },
      {
        path: "listGroupReport",
        component: ReportListGroupComponent
      },
      {
        path: "listPostReport",
        component: ReportListPostComponent
      },
      {
        path: "listUserReport",
        component: ReportListUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
