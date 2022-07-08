import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../services/models/user.model";
import {GroupService} from "../../../services/group/group.service";

@Component({
  selector: 'app-dialog-create-group',
  templateUrl: './dialog-create-group.component.html',
  styleUrls: ['./dialog-create-group.component.css']
})
export class DialogCreateGroupComponent implements OnInit {

  formData: FormGroup;
  profilePicture: any;
  bannerPicture: any;
  profilePictureURL: any;
  bannerPictureURL: any;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateGroupComponent>,
    private _formBuilder: FormBuilder,
    private _groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  onClickSubmit = async () => {
    if (this.formData.valid) {
      await this._groupService.createGroup(this.data.user, this.formData, this.profilePicture, this.bannerPicture).then(() => this.dialogRef.close())
    }
  };

  onProfilePictureSelected() {
    const inputNode: any = document.querySelector('#profilePicture');
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
          this.profilePictureURL = file;
          this.profilePicture = inputNode.files[0];
        }
      };
    }
  }

  onBannerPictureSelected() {
    const inputNode: any = document.querySelector('#bannerPicture');
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
          this.bannerPictureURL = file;
          this.bannerPicture = inputNode.files[0];
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
      profilePicture: new FormControl('', []),
      bannerPicture: new FormControl('', [])
    });
  }
}
