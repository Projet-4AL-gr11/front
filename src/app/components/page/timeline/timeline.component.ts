import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Title} from "@angular/platform-browser";
import {Post} from "../../../services/models/post.model";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  offset: number = 0;
  limit: number = 10;
  loading: boolean;
  posts: Post[] = [];

  constructor(public _postService: PostService,
              private _userService: UserService,
              public _authService: AuthService,
              private _titleService: Title) {
    this._titleService.setTitle("Accueil - " + environment.name);
  }

  ngOnInit(): void {
    this.getMorePosts();
  }

  removePost($event: Post) {
    this.posts = this.posts.filter(post => post.id !== $event.id);
  }

  ngOnDestroy(): void {
  }

  triggerGetMore($event) {
    if ($event.endIndex !== this.posts.length - 1 || this.loading) return;
    this.getMorePosts();
  }

  getMorePosts() {
    this.loading = true;
    console.log(" offset: " + this.offset + " limit: " + this.limit)
    firstValueFrom(this._postService.getTimeline( this.limit, this.offset))
      .then(posts => {
        this.posts = this.posts.concat(posts);
        this.offset += this.limit;
        if (posts.length > 0) {
          this.loading = false;
        }
        console.log(this.posts?.length)
      });
  }
}

