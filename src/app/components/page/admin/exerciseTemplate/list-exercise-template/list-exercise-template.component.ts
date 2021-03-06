import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseService} from "../../../../../services/exercise/exercise.service";
import {ExerciseTemplate} from "../../../../../services/models/erxercise_template.model";
import {environment} from "../../../../../../environments/environment";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-exercise-template',
  templateUrl: './list-exercise-template.component.html',
  styleUrls: ['./list-exercise-template.component.css']
})
export class ListExerciseTemplateComponent implements OnInit {

  exerciseTemplates: ExerciseTemplate[];
  displayedColumns: string[] = ['id','name', 'description', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<ExerciseTemplate>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _exerciseService: ExerciseService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }

  private async initializeData() {
    await this._exerciseService.getAllExerciseTemplate().subscribe({
      next: exerciseTemplates => {
        this.dataSource = new MatTableDataSource<ExerciseTemplate>(exerciseTemplates);
        this.dataSource.paginator = this.paginator;
        this.sort !== null ? this.dataSource.sort = this.sort : null;

      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeExerciseTemplate(id) {
    this._exerciseService.removeExerciseTemplate(id).subscribe({
      next: async () => {
        await this.initializeData();
      },
      error: err => {
        if (!environment.production){
          console.error(err)
        }
      }
    })
  }

  updateExerciseTemplate(id: string) {
    this._router.navigateByUrl("admin/updateExerciseTemplate/" + id).then();
  }

  gotToCreateExercisePage() {
    this._router.navigateByUrl("admin/createExerciseTemplate")
  }
}
