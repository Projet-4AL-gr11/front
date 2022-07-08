import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {PostService} from "../../../services/post/post.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreatePostComponent} from "../../dialog/dialog-create-post/dialog-create-post.component";
import {User} from "../../../services/models/user.model";

@Component({
  selector: 'app-button-create-post',
  templateUrl: './button-create-post.component.html',
  styleUrls: ['./button-create-post.component.css']
})
export class ButtonCreatePostComponent implements OnInit {

  @Output() postSend: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _authService: AuthService,
              private _userService: UserService,
              private _postService: PostService,
              public dialogReport: MatDialog) {
  }

  ngOnInit(): void {
  }

  openPopup() {
    const dialog = this.dialogReport.open(DialogCreatePostComponent, {minWidth: "500px", minHeight: "121px", data: {}});
    dialog.afterClosed().subscribe(() => {
      this.postSend.emit()
    })
  }

}
