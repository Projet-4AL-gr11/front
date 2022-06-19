import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagePostComponent} from "./components/page_/page-post/page-post.component";
import {TimelineComponent} from "./components/page_/timeline/timeline.component";


const routes: Routes = [
  {path: "", loadChildren: () => import('./components/page_/home/home.module').then(m => m.HomeModule)},
  {path: "test", loadChildren: () => import('./components/page_/test/test.module').then(m => m.TestModule)},
  {path: "login", loadChildren: () => import('./components/page_/auth_/login/login.module').then(m => m.LoginModule)},
  {path: "register", loadChildren: () => import('./components/page_/auth_/register/register.module').then(m => m.RegisterModule)},
  {path: "profile/:id", loadChildren: () => import('./components/page_/profile/profile.module').then(m => m.ProfileModule)},
  // TODO: A modifier
  // {path: "post/:id", loadChildren: () => import('./components/page_/page-post/page-post.module').then(m => m.PagePostModule)},
  {path: "post/:id", component: PagePostComponent},
  // {path: "timeline", loadChildren: () => import('./components/page_/timeline/timeline.module').then(m => m.TimelineModule)},
  {path: "timeline", component: TimelineComponent},
  {path: "notifications", loadChildren: () => import('./components/page_/notifications/notifications.module').then(m => m.NotificationsModule)},
  {path: "code", loadChildren: () => import('./components/page_/code/code.module').then(m => m.CodeModule)},
  {path: "event/:eventId", loadChildren: () => import('./components/page_/page-event/page-event.module').then(m => m.PageEventModule)},
  {path: "social", loadChildren: () => import('./components/page_/social/social.module').then(m => m.SocialModule)},
  {path: "leaderboard", loadChildren: () => import('./leaderboard/leaderboard.module').then(m => m.LeaderboardModule)},
  {path: '**', redirectTo: "/"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
