import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {ButtonCreatePostComponent} from "./button-create-post/button-create-post.component";



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
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
