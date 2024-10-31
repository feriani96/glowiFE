import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { MainContentComponent } from './shared/components/main-content/main-content.component';
;

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'home', component: MainContentComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'order', component: TrackOrderComponent},
  { path: 'customer', loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule) }, 
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
