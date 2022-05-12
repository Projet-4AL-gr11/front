import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: "home", loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: "login", loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: "register", loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  {path: "profile", loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  {path: "code", loadChildren: () => import('./code/code.module').then(m => m.CodeModule)},
  {path: "social", loadChildren: () => import('./social/social.module').then(m => m.SocialModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
