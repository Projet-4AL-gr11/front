import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HomeModule} from "./components/page/home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {LeaderboardModule} from "./leaderboard/leaderboard.module";
import {ProfileModule} from "./components/page/profile/profile.module";
import {CodeModule} from "./components/page/code/code.module";
import {SocialModule} from "./components/page/social/social.module";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TimelineModule} from "./components/page/timeline/timeline.module";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {DialogModule} from "./components/dialog/dialog.module";
import {TestModule} from "./components/page/test/test.module";
import {AuthModule} from "./components/page/auth/auth.module";

@NgModule({
  imports: [
    BrowserModule,
    HomeModule,
    AuthModule,
    SocialModule,
    CodeModule,
    LeaderboardModule,
    SharedModule,
    DialogModule,
    TestModule,
    ReactiveFormsModule,
    FormsModule,
    PickerModule,
    VirtualScrollerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TimelineModule,
    ProfileModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    //
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    MatSnackBar
  ],
  exports: [
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
