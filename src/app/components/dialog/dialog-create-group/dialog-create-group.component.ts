import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../shared/models/user.model";
import {GroupService} from "../../../services/group/group.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-dialog-create-group',
  templateUrl: './dialog-create-group.component.html',
  styleUrls: ['./dialog-create-group.component.css']
})
export class DialogCreateGroupComponent implements OnInit {

  formData: FormGroup;
  picture: File;
  pictureURL: string;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateGroupComponent>,
    private _formBuilder: FormBuilder,
    private _groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) { }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  onClickSubmit() {
    if (this.formData.valid) {
      firstValueFrom(this._groupService.createGroup(this.data.user, this.formData)).then(()=> this.dialogRef.close())
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
    });
    this.formData.patchValue({
      name: this.data.user
    })
  }
}
