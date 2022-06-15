import {NgModule} from "@angular/core";
import {DialogUpdateUserComponent} from "./dialog-update-user.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {PipesModules} from "../../../pipes/pipes.modules";


@NgModule({
  declarations: [
    DialogUpdateUserComponent,
  ],
  imports: [
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PipesModules
  ],
  exports: [
    DialogUpdateUserComponent,
  ]
})
export class DialogUpdateUserModule { }
