import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
<<<<<<< HEAD:src/app/components/shared/shared.module.ts
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {ButtonCreatePostComponent} from "./button-create-post/button-create-post.component";
=======
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
>>>>>>> pageEvetAndCode:src/app/shared/shared.module.ts



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatBadgeModule,
    FontAwesomeModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonCreatePostComponent,
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonCreatePostComponent,
  ],
})
export class SharedModule { }
