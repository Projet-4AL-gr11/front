import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HomeModule} from "./components/page_/home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {LeaderboardModule} from "./leaderboard/leaderboard.module";
import {LoginModule} from "./components/page_/auth_/login/login.module";
import {RegisterModule} from "./components/page_/auth_/register/register.module";
import {ProfileModule} from "./components/page_/profile/profile.module";
import {CodeModule} from "./components/page_/code/code.module";
import {SocialModule} from "./components/page_/social/social.module";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TimelineModule} from "./components/page_/timeline/timeline.module";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {DialogModule} from "./components/dialog_/dialog.module";
import {TestModule} from "./components/page_/test/test.module";
import {GlobalHttpInterceptor} from "./interceptors/auth-interceptor.interceptor";
import {PagePostModule} from "./components/page_/page-post/page-post.module";
import {NotificationsModule} from "./components/page_/notifications/notifications.module";
import {CardUserAskJoinGroupModule} from "./components/card_/card-user-ask-join-group/card-user-ask-join-group.module";
import {PageEventModule} from "./components/page_/page-event/page-event.module";
import {CardLeaderboardModule} from "./components/card_/card-leaderbord/card-leaderboard.module";
import {CardEventRankingModule} from "./components/card_/card-event-ranking/card-event-ranking.module";

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
    DialogModule,
    TestModule,
    ReactiveFormsModule,
    FormsModule,
    PickerModule,
    VirtualScrollerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TimelineModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    PagePostModule,
    NotificationsModule,
    CardUserAskJoinGroupModule,
    PageEventModule,
    CardLeaderboardModule,
    CardEventRankingModule,
    //
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    MatSnackBar,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
