import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PermissionTypesComponent } from './pages/permission-types/permission-types.component';
import { LogsComponent } from './pages/logs/logs.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'home/profile/:id',
        component: ProfileComponent
      },
      {
        path: 'teams',
        component: TeamsComponent
      },
      {
        path: 'permissiontypes',
        component: PermissionTypesComponent
      },
      {
        path: 'logs',
        component: LogsComponent
      },
      {
        path: 'changepassword',
        component: ChangepasswordComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
