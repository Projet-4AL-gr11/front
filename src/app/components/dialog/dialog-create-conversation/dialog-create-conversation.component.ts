import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../services/models/user.model";
import {ConversationService} from "../../../services/conversation/conversation.service";

@Component({
  selector: 'app-dialog-create-conversation',
  templateUrl: './dialog-create-conversation.component.html',
  styleUrls: ['./dialog-create-conversation.component.css']
})
export class DialogCreateConversationComponent implements OnInit {
  formData: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateConversationComponent>,
    private _formBuilder: FormBuilder,
    private _conversationService: ConversationService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  onClickSubmit() {
    if (this.formData.valid) {
      this._conversationService.createRoom(this.formData.getRawValue());
      this.dialogRef.close();
    }
  }

  private initializeFormGroup() {
    this.formData = this._formBuilder.group({
      users: new FormArray([], [Validators.required])
    })
  }

  initUser(user: User) {
    return new FormControl({
      id: user.id,
      username: user.username,
      email: user.email
    });
  }

  addUser(userFormControl: FormControl) {
    this.users.push(userFormControl);
  }

  removeUser(userId: string) {
    this.users.removeAt(this.users.value.findIndex((user: User) => user.id === userId));
  }

  get name(): FormControl {
    return this.formData.get('name') as FormControl;
  }

  get users(): FormArray {
    return this.formData.get('users') as FormArray;
  }
}
