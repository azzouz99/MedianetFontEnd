import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PowerbiComponent } from './Admin/powerbi/powerbi.component';
import { HomeComponent } from './Commun/home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import {RegisterComponent} from "./Auth/register/register.component";
import {authGuard} from "./services/guard/auth.guard";
import {DatasetComponent} from "./Admin/dataset/dataset.component";
import {UserlistComponent} from "./Admin/UserList/userlist/userlist.component";
import {ProfileComponent} from "./Client/profile/profile.component";
import {roleguardGuard} from "./services/guard/roleguard.guard";
import {PredictionComponent} from "./Admin/prediction/prediction.component";
import {LoaderComponent} from "./Commun/Loaders/loader/loader.component";
import {DecisionsComponent} from "./Admin/decisions/decisions.component";


const routes: Routes = [
  { path: 'dashboard', component: PowerbiComponent ,
  canActivate : [authGuard]},

  { path: 'home', component: HomeComponent, canActivate : [authGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'decisions', component: DecisionsComponent,canActivate: [roleguardGuard], data: { expectedRoles: ['ROLE_ADMIN']}},
  { path: 'userlist', component: UserlistComponent,canActivate: [roleguardGuard], data: { expectedRoles: ['ROLE_ADMIN']}},
  { path: 'register', component: RegisterComponent },
  { path: 'data', component: DatasetComponent ,canActivate: [roleguardGuard], data: { expectedRoles: ['ROLE_ADMIN']} },
  { path: 'details', component: ProfileComponent , canActivate : [authGuard] },
  { path: 'prediction', component: PredictionComponent,canActivate: [roleguardGuard], data: { expectedRoles: ['ROLE_ADMIN']} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
