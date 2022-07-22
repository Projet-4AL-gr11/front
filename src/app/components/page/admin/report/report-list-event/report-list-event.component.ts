import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Report} from "../../../../../services/models/report.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReportService} from "../../../../../services/report/report.service";
import {CommentService} from "../../../../../services/comment/comment.service";
import {environment} from "../../../../../../environments/environment";
import {EventService} from "../../../../../services/event/event.service";

@Component({
  selector: 'app-report-list-event',
  templateUrl: './report-list-event.component.html',
  styleUrls: ['./report-list-event.component.css']
})
export class ReportListEventComponent implements OnInit {

  displayedColumns: string[] = ['userReporter', 'reportedEvent','owner', 'text','nbReport', 'createdAt', 'actions', 'open'];
  dataSource: MatTableDataSource<Report>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  env: any;

  constructor(public _reportService: ReportService,
              private _eventService: EventService) {
    this.env = environment;
  }

  async ngOnInit(): Promise<void> {
    await this.updateData();
  }

  private async updateData() {
    this._reportService.getRetortedEvent().subscribe({
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

  removeEvent(id) {
    this._eventService.deleteEvent(id).subscribe({
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
