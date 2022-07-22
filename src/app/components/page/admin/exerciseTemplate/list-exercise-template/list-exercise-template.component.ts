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
export class ListExerciseTemplateComponent implements OnInit, AfterViewInit {

  exerciseTemplates: ExerciseTemplate[];
  displayedColumns: string[] = ['id','description', 'name','nbReport', 'actions', 'open'];
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

  private initializeData() {
    this._exerciseService.getAllExerciseTemplate().subscribe({
      next: exerciseTemplates => {
        this.dataSource = new MatTableDataSource<ExerciseTemplate>(exerciseTemplates);
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort !== null?this.dataSource.sort = this.sort: null;
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
      next: () => {
        this.initializeData();
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
}
