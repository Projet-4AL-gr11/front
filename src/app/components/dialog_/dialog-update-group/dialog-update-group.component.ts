import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GroupService} from "../../../services/group/group.service";
import {User} from "../../../shared/models/user.model";
import {firstValueFrom} from "rxjs";
import {Group} from "../../../shared/models/group.model";

@Component({
  selector: 'app-dialog-update-group',
  templateUrl: './dialog-update-group.component.html',
  styleUrls: ['./dialog-update-group.component.css']
})
export class DialogUpdateGroupComponent implements OnInit {

  formData: FormGroup;
  picture: File;
  pictureURL: string;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateGroupComponent>,
    private _formBuilder: FormBuilder,
    private _groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public data: { group: Group }
  ) { }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  onClickSubmit() {
    if (this.formData.valid) {
      firstValueFrom(this._groupService.updateGroup(this.data.group, this.formData, this.picture)).then(()=> this.dialogRef.close())
    }
  }

  onPictureSelected() {
    const inputNode: any = document.querySelector('#picture');
    if (typeof (FileReader) !== 'undefined') {

      const reader = new FileReader();
      reader.readAsDataURL(inputNode.files[0]);
      reader.onload = (e: any) => {
        const file: string = e.target.result
        if (file.match(/image\/*/) === null) {
          console.log('invalid file input');
          return;
        }
        if (typeof file === "string") {
          this.pictureURL = file;
          this.picture = inputNode.files[0];
        }
      };
    }
  }

  private initializeFormGroup() {
    this.formData = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(2)
      ]),
      picture: new FormControl('', []),
    });
    this.formData.patchValue({
      name: this.data.group.name
    })
  }
}
