import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { TransHistoryComponent } from './trans-history/trans-history.component';

const routes: Routes = [
  {
  path:'', component: LoginComponent,
},
{
  path:'user_dashboard', component:DashboardComponent,
},
{
  path:'register', component:RegisterComponent,
},
{
  path:'history', component:TransHistoryComponent,
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
