import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '**', redirectTo: "/timeline"},
  {path: "", loadChildren: () => import('./components/page/home/home.module').then(m => m.HomeModule)},
  {path: "auth", loadChildren: () => import('./components/page/auth/auth.module').then(m => m.AuthModule)},
  {path: "code", loadChildren: () => import('./components/page/code/code.module').then(m => m.CodeModule)},
  {path: "social", loadChildren: () => import('./components/page/social/social.module').then(m => m.SocialModule)},
  {path: "leaderboard",loadChildren: () => import('./components/page/leaderboard/leaderboard.module').then(m => m.LeaderboardModule)},
  {path: "timeline", loadChildren: () => import('./components/page/timeline/timeline.module').then(m => m.TimelineModule)},
  {path: "profile/:id", loadChildren: () => import('./components/page/profile/profile.module').then(m => m.ProfileModule)},
  {path: "notifications",loadChildren: () => import('./components/page/notifications/notifications.module').then(m => m.NotificationsModule)},
  {path: "event/:eventId", loadChildren: () => import('./components/page/event-view/event-view.module').then(m => m.EventViewModule)},
  {path: "group/:groupId", loadChildren: () => import('./components/page/group-view/group-view.module').then(m => m.GroupViewModule)},
  {path: "post/:id", loadChildren: () => import('./components/page/post-view/post-view.module').then(m => m.PostViewModule)},
  {path: "admin", loadChildren: () => import('./components/page/admin/admin.module').then(m => m.AdminModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
