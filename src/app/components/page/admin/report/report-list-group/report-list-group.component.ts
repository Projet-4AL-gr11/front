import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Report} from "../../../../../services/models/report.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReportService} from "../../../../../services/report/report.service";
import {EventService} from "../../../../../services/event/event.service";
import {environment} from "../../../../../../environments/environment";
import {GroupService} from "../../../../../services/group/group.service";

@Component({
  selector: 'app-report-list-group',
  templateUrl: './report-list-group.component.html',
  styleUrls: ['./report-list-group.component.css']
})
export class ReportListGroupComponent implements OnInit {


  displayedColumns: string[] = ['userReporter', 'reportedGroup', 'text','nbReport', 'createdAt', 'actions', 'open'];
  dataSource: MatTableDataSource<Report>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  env: any;

  constructor(public _reportService: ReportService,
              private _groupService: GroupService) {
    this.env = environment;
  }

  async ngOnInit(): Promise<void> {
    await this.updateData();
  }

  private async updateData() {
    this._reportService.getReportedGroups().subscribe({
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

  removeGroup(id) {
    this._groupService.removeGroup(id).subscribe({
      next: () => {
        this.updateData();
      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
        }
      }
    })
  }

}
