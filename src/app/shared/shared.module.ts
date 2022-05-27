import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import {RouterModule} from "@angular/router";
import {AppModule} from "../app.module";



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
