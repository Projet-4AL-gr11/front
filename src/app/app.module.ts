import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HomeModule} from "./components/home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {LoginModule} from "./components/login/login.module";
import {RegisterModule} from "./components/register/register.module";
import {ProfileModule} from "./components/profile/profile.module";
import {CodeModule} from "./components/code/code.module";
import {SocialModule} from "./components/social/social.module";

@NgModule({
  imports: [
    BrowserModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    ProfileModule,
    SocialModule,
    CodeModule,
    SharedModule,
    //
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
