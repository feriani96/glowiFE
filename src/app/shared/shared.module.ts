import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { AngularMaterialModule } from '../AngularMaterialModule';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../features/login/login.component';
import { SignupComponent } from '../features/signup/signup.component';
import { TrackOrderComponent } from '../track-order/track-order.component';
import { CustomerModule } from '../features/customer/customer.module';
import { AdminModule } from '../features/admin/admin.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    TrackOrderComponent,
    
  ],
  
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AppRoutingModule,
    AdminModule,
    CustomerModule,
    ReactiveFormsModule,
    HttpClientModule

  ],

  exports: [
    ImageUploaderComponent,
    HeaderComponent,
    NavbarComponent,
    MainContentComponent,
    LoginComponent,
    SignupComponent,
    TrackOrderComponent,
  ]
})
export class SharedModule { }
