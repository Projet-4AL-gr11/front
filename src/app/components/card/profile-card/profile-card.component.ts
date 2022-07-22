import { Component, OnInit } from '@angular/core';
import {User} from "../../../services/models/user.model";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Post} from "../../../services/models/post.model";
import {GroupService} from "../../../services/group/group.service";
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  user: User;
  posts: Post[] ;
  friends: User[];

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public groupService: GroupService,
    public postService: PostService,


  ) { }

  ngOnInit(): void {
    this.authService.actual().subscribe({
      next: user => {
        this.user = user
        this.posts = user.createdPosts
        this.friends = user.friends
      }});
  }
}
