import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Report} from "../../../../../services/models/report.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReportService} from "../../../../../services/report/report.service";
import {UserService} from "../../../../../services/user/user.service";
import {environment} from "../../../../../../environments/environment";
import {ExerciseService} from "../../../../../services/exercise/exercise.service";

@Component({
  selector: 'app-report-list-exercise',
  templateUrl: './report-list-exercise.component.html',
  styleUrls: ['./report-list-exercise.component.css']
})
export class ReportListExerciseComponent implements OnInit {

  displayedColumns: string[] = ['userReporter', 'reportedExercise', 'text','nbReport', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Report>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  env: any;

  constructor(public _reportService: ReportService,
              private _exerciseService: ExerciseService) {
    this.env = environment;
  }

  async ngOnInit(): Promise<void> {
    await this.updateData();
  }

  private async updateData() {
    this._reportService.getReportedExercise().subscribe({
      next: reports => {
        this.dataSource = new MatTableDataSource(reports);
        this.dataSource.paginator = this.paginator;
        this.sort !== null?this.dataSource.sort = this.sort: null;
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
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

  deleteReport(reportId: string){
    this._reportService.removeReport(reportId).subscribe({
      next: () => {
        this.updateData();
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    });
  }

}
