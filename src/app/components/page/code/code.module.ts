import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { CodeRoutingModule } from './code-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {CardsModule} from "../../card/cards.module";
import { LanguageSelectComponent } from './language-select/language-select.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    LanguageSelectComponent,
    SandboxComponent,
  ],
  imports: [
    CommonModule,
    CodeRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    CardsModule,
  ],
  exports: [
    LanguageSelectComponent,
    SandboxComponent,

  ]
})
export class CodeModule {
}
