import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogReportComponent} from "../../dialog/dialog-report/dialog-report.component";
import {AuthService} from "../../../services/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {CommentService} from "../../../services/comment/comment.service";
import {Comment} from "../../../services/models/comment.model";
import {ReportTypeEnum} from '../../shared/enum/report_type.enum';
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input()
  comment: Comment;
  faEllipsisH = faEllipsisH;
  @Output() removeCommentCard: EventEmitter<Comment> = new EventEmitter<Comment>();

  constructor(public _authService: AuthService,
              private _commentService: CommentService,
              private matDialog: MatDialog) {
  }

  deleteComment() {
    firstValueFrom(this._commentService.deleteComment(this.comment.id)).then(() => {
      this.removeCommentCard.emit(this.comment);
    });
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
