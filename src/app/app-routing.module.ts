app-routing 

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainContentComponent } from './shared/components/main-content/main-content.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TrackOrderComponent } from './track-order/track-order.component';


const routes: Routes = [
  { path: '', component: MainContentComponent }, 
  { path: 'navbar', component: NavbarComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'track-order', component: TrackOrderComponent },

  // Chargement des modules pour les rôles spécifiques
  { 
    path: 'customer', 
    loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule), 
    // canActivate: [AuthGuard],
    data: { roles: ['CUSTOMER'] } 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule), 
    // canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] } 
  },

  // Redirection vers la page d'accueil pour toute route non définie
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  // imports: [RouterModule.forChild(routes)],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
