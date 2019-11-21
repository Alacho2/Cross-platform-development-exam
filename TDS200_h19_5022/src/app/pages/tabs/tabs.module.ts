import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home', loadChildren: () => import('../home/home.module').then( m => m.HomePageModule), },
      {
        path: 'tab2',
        loadChildren: '../tab2/tab2.module#Tab2PageModule',
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule',
        ...canActivate(redirectUnauthorizedTo(['tabs/login']))
      },
      {
        path: 'create-room',
        loadChildren: '../create-room/create-room.module#CreateRoomPageModule',
        ...canActivate(redirectUnauthorizedTo(['tabs/login']))
      },
      {
        path: 'login',
        loadChildren: '../login/login.module#LoginPageModule',
        ...canActivate(redirectLoggedInTo(['tabs/home']))
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
