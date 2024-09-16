import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route to login
  { path: 'login', component: LoginComponent },  // Login route
  { path: 'dashboard', component: DashboardComponent },  // Dashboard route
  { path: 'report', component: ReportComponent },  // Report route
  { path: 'signup', component: SignupComponent },  // Signup route
  { path: '**', redirectTo: '/login' }  // Wildcard route for undefined routes
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
