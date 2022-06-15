import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatMenuModule} from "@angular/material/menu";
import {PipesModules} from "../../../pipes/pipes.modules";
import {PostShareCardModule} from "../../card_/post-share-card/post-share-card.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {DialogUpdateGroupComponent} from "./dialog-update-group.component";

@NgModule({
  declarations: [
    DialogUpdateGroupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MatMenuModule,
    PipesModules,
    PostShareCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [
    DialogUpdateGroupComponent,
  ]
})
export class DialogCreatePostModule { }
