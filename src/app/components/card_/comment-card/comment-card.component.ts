import {Component, Input, OnInit} from '@angular/core';
import {DialogReportComponent} from "../../dialog_/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../../shared/enum/report_type.enum";
import {AuthService} from "../../../services/auth/auth.service";
import {CommentService} from "../../../services/comment/comment.service";
import {MatDialog} from "@angular/material/dialog";
import {Comment} from "../../../shared/models/comment.model";
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit {
  @Input()
  comment: Comment;
  faEllipsisH = faEllipsisH;

  constructor(public _authService: AuthService,
              private _commentService: CommentService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  deleteComment() {
    this._commentService.deleteComment(this.comment.id).toPromise().then();
  }

  showDialogReport() {
    const dialogRef = this.matDialog.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.comment.id, reportType: ReportTypeEnum.COMMENT}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
