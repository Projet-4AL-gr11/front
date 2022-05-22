import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HomeModule} from "./components/page_/home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {LoginModule} from "./components/page_/auth_/login/login.module";
import {RegisterModule} from "./components/page_/auth_/register/register.module";
import {ProfileModule} from "./components/page_/profile/profile.module";
import {CodeModule} from "./components/page_/code/code.module";
import {SocialModule} from "./components/page_/social/social.module";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ImageUrlPipe } from './pipes/image-url/image-url.pipe';

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
    NavbarComponent,
    ImageUrlPipe,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
