import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Report} from "../../../components/shared/models/report.model";
import {PostService} from "../../../services/post/post.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReportTypeEnum} from "../../../components/shared/enum/report_type.enum";
import {CommentService} from "../../../services/comment/comment.service";
import {UserService} from "../../../services/user/user.service";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {EventService} from "../../../services/event/event.service";
import {GroupService} from "../../../services/group/group.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-dialog-report',
  templateUrl: './dialog-report.component.html',
  styleUrls: ['./dialog-report.component.css']
})
export class DialogReportComponent implements OnInit {
  formData: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogReportComponent>,
              private _userService: UserService,
              private _postService: PostService,
              private _eventService: EventService,
              private _organisationService: ExerciseService,
              private _groupService: GroupService,
              private _commentService: CommentService,
              @Inject(MAT_DIALOG_DATA) public data: { id: string, reportType: ReportTypeEnum }) {
  }

  ngOnInit(): void {
    this.initialiseFormReport();
  }

  onClickSubmit(formData) {
    if (this.formData.valid){
      let newReport: Report = new Report();
      newReport.text = formData.text;
      if (this.data.reportType === ReportTypeEnum.USER) {
        firstValueFrom(this._userService.sendReport(this.data.id, newReport))
          .then(() => this.dialogRef.close());
      } else if (this.data.reportType === ReportTypeEnum.POST) {
        firstValueFrom(this._postService.sendReport(this.data.id, newReport))
          .then(() => this.dialogRef.close());
      } else if (this.data.reportType === ReportTypeEnum.EXERCISE) {
        firstValueFrom(this._organisationService.sendReport(this.data.id, newReport))
          .then(() => this.dialogRef.close());
      } else if (this.data.reportType === ReportTypeEnum.GROUP) {
        firstValueFrom(this._groupService.sendReport(this.data.id, newReport))
          .then(() => this.dialogRef.close());
      } else if (this.data.reportType === ReportTypeEnum.EVENT) {
        firstValueFrom(this._eventService.sendReport(this.data.id, newReport))
          .then(() => this.dialogRef.close());
      } else if (this.data.reportType === ReportTypeEnum.COMMENT) {
        firstValueFrom(this._commentService.sendReport(this.data.id, newReport))
          .then(() => this.dialogRef.close());
      }
    }
  }

  private initialiseFormReport() {
    this.formData = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(500)
      ])
    })
  }

}
