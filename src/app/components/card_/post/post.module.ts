import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PostComponent} from "./post.component";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ImageUrlPipe} from "../../../pipes/image-url/image-url.pipe";
import {AppModule} from "../../../app.module";
import {PipesModules} from "../../../pipes/pipes.modules";
import {MatMenuModule} from "@angular/material/menu";
import {PostShareCardModule} from "../post-share-card/post-share-card.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    PostComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        PipesModules,
        MatMenuModule,
        PostShareCardModule,
        MatButtonModule
    ],
  exports: [
    PostComponent,
  ]
})
export class PostModule { }
