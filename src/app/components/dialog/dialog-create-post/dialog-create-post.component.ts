import {Component, Inject, OnInit} from '@angular/core';
import {faCalendarAlt, faImage, faPeopleGroup, faTimes} from '@fortawesome/free-solid-svg-icons';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../../services/models/post.model";
import {Event} from "../../../services/models/event.model";
import {AuthService} from "../../../services/auth/auth.service";
import {PostService} from "../../../services/post/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {firstValueFrom} from "rxjs";
import {User} from "../../../services/models/user.model";
import {EventService} from "../../../services/event/event.service";
import {Group} from "../../../services/models/group.model";
import {GroupService} from "../../../services/group/group.service";


@Component({
  selector: 'app-dialog-create-post',
  templateUrl: './dialog-create-post.component.html',
  styleUrls: ['./dialog-create-post.component.css']
})
export class DialogCreatePostComponent implements OnInit {
  faTimes = faTimes;
  faImage = faImage;
  faGroup = faPeopleGroup;
  faCalendarAlt = faCalendarAlt;
  medias: File[] = [];
  mediasURL: string[];
  caretPosition: number = 0;
  showPopup: boolean = false;
  text: string;
  events: Event[];
  groupSelected: Group;
  groups: Group[] = [];
  user: User;

  constructor(public _authService: AuthService,
              private _postService: PostService,
              public _eventService: EventService,
              private _groupService: GroupService,
              public dialogRef: MatDialogRef<DialogCreatePostComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: {
                sharedEvent: Event, sharesPost: Post
              }) {
  }

  ngOnInit(): void {
    firstValueFrom(this._authService.actual()).then(user => {
      this.user = user
      firstValueFrom(this._eventService.getEventParticipation(user.id, 100, 0)).then(events => {
        this.events = events
      });
      firstValueFrom(this._groupService.getGroupsWhereUserIsAdmin(user.id)).then(groups => this.groups = groups)
    });
  }

  async sendPost() {
    if ((this.text === undefined || this.text === '')) {

      this._snackBar.open("Vous ne pouvez créer un poste s'il est vide.", "Fermer");
      return;
    }
    await this._postService.createPost(this.text, this.data?.sharesPost?.id, this.data?.sharedEvent?.id, this.medias, this.groupSelected).then(() => {
      this.dialogRef.close();
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
