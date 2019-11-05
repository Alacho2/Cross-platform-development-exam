import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const routes: Routes = [
   // { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },
  /*{
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    // ...canActivate(redirectUnauthorizedTo(['login']))
  }, */
 /* {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
    ...canActivate(redirectLoggedInTo(['tabs/home']))
  }, */
  /*{
    path: 'create-room',
    loadChildren: './pages/create-room/create-room.module#CreateRoomPageModule',
    ...canActivate(redirectUnauthorizedTo(['login']))
  }, */
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
