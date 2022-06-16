import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
  declarations: [
        HeaderComponent,
        FooterComponent
    ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
})
export class SharedModule { }
