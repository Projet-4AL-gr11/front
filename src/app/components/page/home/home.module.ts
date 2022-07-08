import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {ConversationModule} from "../../conversation/conversation.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    SharedModule,
    MatButtonModule,
  ],
    ConversationModule
  exports: [
    HomeComponent
  ],
})
export class HomeModule {
}
