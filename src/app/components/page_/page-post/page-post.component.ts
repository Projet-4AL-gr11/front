import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {Post} from "../../../shared/models/post.model";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../../services/post/post.service";
import {UserService} from "../../../services/user/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Title} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {faCalendarAlt, faImage, faPaperPlane, faTimes, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {CommentService} from "../../../services/comment/comment.service";

@Component({
  selector: 'app-page-post',
  templateUrl: './page-post.component.html',
  styleUrls: ['./page-post.component.css']
})
export class PagePostComponent implements OnInit {

  faTimes = faTimes;
  faImage = faImage;
  faCalendarAlt = faCalendarAlt;
  faUserFriends = faUserFriends;
  faPaperPlane = faPaperPlane;
  showEmojiPicker: boolean = false;
  text: string;
  post: Post;
  caretPosition: number = 0;
  medias: File[];
  mediasURL: string[];

  constructor(private _activatedRoute: ActivatedRoute,
              public _postService: PostService,
              public _commentService: CommentService,
              public _userService: UserService,
              public _authService: AuthService,
              private _titleService: Title,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => this.update(params["id"]).then());
  }

  async update(postId: string): Promise<void> {
    await firstValueFrom(this._postService.getPostById(postId)).then(post => {
      this.post = post;
      this._titleService.setTitle(post.text + " - " + environment.name);
    });
    await firstValueFrom(this._postService.sharedPost(postId)).then(shared=> this.post.sharesPost = shared);
    await firstValueFrom(this._commentService.getComments(postId)).then(comments => this.post.comments = comments);
  }

  sendComment(): void {
    if (this.text === undefined || this.text.length <= 0) {
      this._snackBar.open("Impossible d'envoyer un commentaire vide", "Fermer");
      return;
    }
    firstValueFrom(this._commentService.sendComment(this.post.id, this.text)).then(comment => {
      if (this.post.comments === undefined) {
        this.post.comments = [];
      }
      this.post.comments = [comment].concat(this.post.comments);
    });
  }

  setCaretPosition($event: any) {
    if ($event.target.selectionStart) {
      this.caretPosition = $event.target.selectionStart;
    } else {
      this.caretPosition = 0;
    }
  }

  openFileSelector() {
    document.getElementById('file-selector').click();
  }

  addImages($event: any) {
    const files: File[] = Array.from($event.target.files);
    if (files.length > 4) {
      this._snackBar.open("Vous ne pouvez ajouter que 4 medias au maximum.", "Fermer");
      return;
    }
    if (files.some((file: File) => file.type.match(/image\/*/) === null)) {
      this._snackBar.open("Vous ne pouvez ajouter que des images.", "Fermer");
      return;
    }
    this.medias = files;
    this.mediasURL = [];
    for (let file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        if (typeof reader.result === "string") {
          this.mediasURL.push(reader.result);
        }
      }
    }
  }
}
