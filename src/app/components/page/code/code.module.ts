import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeRoutingModule } from './code-routing.module';
import {CodeComponent} from "./code.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CodeComponent,
  ],
    imports: [
        CommonModule,
        CodeRoutingModule,
        SharedModule
    ],
  exports: [
    CodeComponent,
  ]
})
export class CodeModule { }
