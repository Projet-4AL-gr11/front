import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth/auth.service";
import {PostService} from "../../../services/post/post.service";
import {firstValueFrom, Subscription, take, timer} from "rxjs";
import {Post} from "../../../services/models/post.model";
import {ReportTypeEnum} from "../../shared/enum/report_type.enum";
import {MediaService} from "../../../services/media/media.service";
import {DialogReportComponent} from "../../dialog/dialog-report/dialog-report.component";
import {
  DialogCreatePostComponent
} from "../../dialog/dialog-create-post/dialog-create-post.component";
import {faCheckCircle, faComment, faEllipsisH, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input()
  post: Post;
  @Output()
  onDelete: EventEmitter<Post> = new EventEmitter();
  text: string;
  private timeSubscription: Subscription;

  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faShare = faShare;
  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;

  constructor(private _postService: PostService,
              public _authService: AuthService,
              private _mediaService: MediaService,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
    firstValueFrom(this._postService.sharedPost(this.post.id)).then(post => this.post.sharesPost = post);
    firstValueFrom(this._mediaService.getPostMedias(this.post.id)).then(medias => this.post.medias = medias);
    this.updatePost();
    this.timeSubscription = timer(0, 15000)
      .subscribe(() => this.updatePost());
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

  updatePost(): void {
    firstValueFrom(this._postService.getPostLikes(this.post.id)).then(likes => this.post.likes = likes);
    firstValueFrom(this._postService.isPostLiked(this.post.id)).then(isLiked => this.post.isLiked = isLiked);
  }


  showDialogReport() {
    this.matDialog.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.post.id, reportType: ReportTypeEnum.POST}
    });
  }

  deletePost() {
    firstValueFrom(this._postService.deletePost(this.post.id))
      .then(() => this.onDelete.emit(this.post));
  }

  likePost() {
    firstValueFrom(this._postService.likePost(this.post.id))
      .then(() => {
        this.post.isLiked = true;
        firstValueFrom(this._authService.user
          .pipe(take(1)))
          .then(user=>this.post.likes.push(user));
      });
  }

  dislikePost() {
    firstValueFrom(this._postService.dislikePost(this.post.id))
      .then(() => {
        this.post.isLiked = false;
        firstValueFrom(this._authService.user
          .pipe(take(1)))
          .then(user=>this.post.likes = this.post.likes.filter(user1=>user1.id !== user.id));
      });
  }

  sharePost() {
    this.matDialog.open(DialogCreatePostComponent, {
      minWidth: "500px",
      minHeight: "121px",
      data: {sharesPost: this.post}
    });
  }
}
