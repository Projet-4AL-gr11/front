import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Report} from "../../../../../services/models/report.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReportService} from "../../../../../services/report/report.service";
import {environment} from "../../../../../../environments/environment";
import {GroupService} from "../../../../../services/group/group.service";
import {CommentService} from "../../../../../services/comment/comment.service";

@Component({
  selector: 'app-report-list-comment',
  templateUrl: './report-list-comment.component.html',
  styleUrls: ['./report-list-comment.component.css']
})
export class ReportListCommentComponent implements OnInit {

  displayedColumns: string[] = ['userReporter', 'reportedComment', 'commentCreator', 'text','nbReport', 'createdAt', 'actions', 'open'];
  dataSource: MatTableDataSource<Report>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  env: any;

  constructor(public _reportService: ReportService,
              private _commentService: CommentService) {
    this.env = environment;
  }

  async ngOnInit(): Promise<void> {
    await this.updateData();
  }

  private async updateData() {
    this._reportService.getReportedComments().subscribe({
      next: reports => {
        this.dataSource = new MatTableDataSource(reports);

      },
      error: err => {
        if (!environment.production) {
          console.error('Error: ', err);
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

  removeComment(id) {
    this._commentService.deleteComment(id).subscribe({
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
