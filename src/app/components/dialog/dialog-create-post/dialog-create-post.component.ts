import {Component, Inject, OnInit} from '@angular/core';
import {faCalendarAlt, faImage, faSmile, faTimes} from '@fortawesome/free-solid-svg-icons';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../shared/models/post.model";
import {Event} from "../../shared/models/event.model";
import {AuthService} from "../../../services/auth/auth.service";
import {PostService} from "../../../services/post/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-dialog-create-post',
  templateUrl: './dialog-create-post.component.html',
  styleUrls: ['./dialog-create-post.component.css']
})
export class DialogCreatePostComponent implements OnInit {

  faTimes = faTimes;
  faImage = faImage;
  faSmile = faSmile;
  faCalendarAlt = faCalendarAlt;
  medias: File[];
  mediasURL: string[];
  caretPosition: number = 0;
  showPopup: boolean = false;
  text: string;
  events: Event[];

  constructor(public _authService: AuthService,
              private _postService: PostService,
              public dialogRef: MatDialogRef<DialogCreatePostComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: { sharedEvent: Event, sharesPost: Post }) {
  }

  ngOnInit(): void {
  }

  sendPost() {
    if (this.text === undefined && this.text === '' && this.medias.length <= 0 && this.data.sharesPost === undefined && this.data.sharedEvent === undefined) {
      this._snackBar.open("Vous ne pouvez créer un poste s'il est vide.", "Fermer");
      return;
    }
    firstValueFrom(this._postService.createPost(this.text, this.data?.sharesPost?.id, this.data?.sharedEvent?.id, this.medias))
      .then();
    this.dialogRef.close();
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
