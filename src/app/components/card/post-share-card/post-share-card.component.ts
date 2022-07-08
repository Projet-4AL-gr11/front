import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../services/models/post.model";
import {MediaService} from "../../../services/media/media.service";
import {faCheckCircle, faShare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-share-card',
  templateUrl: './post-share-card.component.html',
  styleUrls: ['./post-share-card.component.css']
})
export class PostShareCardComponent implements OnInit {
  @Input()
  post: Post;
  faShare = faShare;
  faCheckCisrcle = faCheckCircle;

  constructor(private _mediaService: MediaService) {
  }

  ngOnInit(): void {
  }


}
