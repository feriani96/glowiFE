import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { AngularMaterialModule } from '../AngularMaterialModule';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    HeaderComponent,
    NavbarComponent,
    MainContentComponent,
  ],
  
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    RouterModule

  ],

  exports: [
    ImageUploaderComponent,
    HeaderComponent,
    NavbarComponent,
    MainContentComponent,
  ]
})
export class SharedModule { }
