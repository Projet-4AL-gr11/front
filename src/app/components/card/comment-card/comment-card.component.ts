import {Component, Input, OnInit} from '@angular/core';
import {DialogReportComponent} from "../../dialog/dialog-report/dialog-report.component";
import {AuthService} from "../../../services/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {CommentService} from "../../../services/comment/comment.service";
import {Comment} from "../../../services/models/comment.model";
import { ReportTypeEnum } from '../../shared/enum/report_type.enum';
import {firstValueFrom} from "rxjs";

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
    firstValueFrom(this._commentService.deleteComment(this.comment.id)).then();
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
