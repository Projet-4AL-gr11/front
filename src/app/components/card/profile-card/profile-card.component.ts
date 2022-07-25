import { Component, OnInit } from '@angular/core';
import {User} from "../../../services/models/user.model";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {GroupService} from "../../../services/group/group.service";
import {PostService} from "../../../services/post/post.service";
import {Post} from "../../../services/models/post.model";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  user: User;
  friends: User[];
  userPost: Post[];


  constructor(
    public userService: UserService,
    public authService: AuthService,
    public groupService: GroupService,
    public postService: PostService,


  ) { }

  ngOnInit(): void {
    this.authService.actual().subscribe(response => {
      this.user = response;

      this.userService.getFriends(this.user?.id).subscribe( response => {
        this.friends = response;
      })
      this.postService.getAllUserPost(this.user?.id).subscribe( response => {
        this.userPost = response;
        console.log(this.user.id)
        console.log(this.userPost)
      })
    })


  }

}
