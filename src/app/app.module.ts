import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {LoginModule} from "./login/login.module";
import {RegisterModule} from "./register/register.module";
import {ProfileModule} from "./profile/profile.module";
import {CodeModule} from "./code/code.module";
import {SocialModule} from "./social/social.module";
import {LeaderboardModule} from "./leaderboard/leaderboard.module";

@NgModule({
  imports: [
    BrowserModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    ProfileModule,
    SocialModule,
    CodeModule,
    LeaderboardModule,
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
