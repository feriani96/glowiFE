import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SignupComponent } from '../features/signup/signup.component';
import { LoginComponent } from '../features/login/login.component';
import { TrackOrderComponent } from '../track-order/track-order.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'home', component: MainContentComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'order', component: TrackOrderComponent},
  // { path: 'customer', loadChildren: () => import('../features/customer/customer.module').then(m => m.CustomerModule) }, 
  // { path: 'admin', loadChildren: () => import('../features/admin/admin.module').then(m => m.AdminModule) 
  //}
];

  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
