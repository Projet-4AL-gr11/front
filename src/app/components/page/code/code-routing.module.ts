import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SandboxComponent} from "./sandbox/sandbox.component";
import {LanguageSelectComponent} from "./language-select/language-select.component";

const routes: Routes = [
  {
    path: "code",
    children: [
      {
        path: "select",
        component: LanguageSelectComponent
      },
      {
        path: "sandbox",
        component: SandboxComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeRoutingModule {
}
