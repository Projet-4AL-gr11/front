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
import { ImageUrlPipe } from './pipes/image-url/image-url.pipe';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRippleModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import { PostComponent } from './components/card_/post/post.component';
import { DialogReportComponent } from './components/dialog_/dialog-report/dialog-report.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { DialogCreatePostComponent } from './components/dialog_/dialog-create-post/dialog-create-post.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import { PostShareCardComponent } from './components/card_/post-share-card/post-share-card.component';
import { TimelineComponent } from './components/page_/timeline/timeline.component';
import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {HttpClientModule} from "@angular/common/http";
import { ButtonCreatePostComponent } from './components/button-create-post/button-create-post.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    AppRoutingModule,
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    FontAwesomeModule,
    PickerModule,
    VirtualScrollerModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    ImageUrlPipe,
    PostComponent,
    DialogReportComponent,
    DialogCreatePostComponent,
    PostShareCardComponent,
    TimelineComponent,
    ButtonCreatePostComponent,
  ],
  providers: [
    MatSnackBar
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
