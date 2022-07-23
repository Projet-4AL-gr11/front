import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HomeModule} from "./components/page/home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import {LeaderboardModule} from "./components/page/leaderboard/leaderboard.module";
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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TimelineModule} from "./components/page/timeline/timeline.module";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {AuthModule} from "./components/page/auth/auth.module";
import {SharedModule} from "./components/shared/shared.module";
import {GlobalHttpInterceptor} from "./interceptors/auth-interceptor.interceptor";
import {PostViewModule} from "./components/page/post-view/post-view.module";
import {NotificationsModule} from "./components/page/notifications/notifications.module";
import {EventViewModule} from "./components/page/event-view/event-view.module";
import {DialogModule} from "./components/dialog/dialog.module";
import {ConversationModule} from "./components/conversation/conversation.module";
import {ProfileModule} from "./components/page/profile/profile.module";
import {GroupViewModule} from "./components/page/group-view/group-view.module";
import {AdminModule} from "./components/page/admin/admin.module";

@NgModule({
  imports: [
    BrowserModule,
    HomeModule,
    AuthModule,
    SocialModule,
    ProfileModule,
    CodeModule,
    LeaderboardModule,
    SharedModule,
    DialogModule,
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
    PostViewModule,
    NotificationsModule,
    EventViewModule,
    ConversationModule,
    ProfileModule,
    GroupViewModule,
    AdminModule,
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
  exports: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
