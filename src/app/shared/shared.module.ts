import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { AngularMaterialModule } from '../AngularMaterialModule';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    HeaderComponent,
    NavbarComponent,
    MainContentComponent,
  ],
  
  imports: [
    CommonModule,
    AngularMaterialModule
  ],

  exports: [
    ImageUploaderComponent,
    HeaderComponent,
    NavbarComponent,
    MainContentComponent,
  ]
})
export class SharedModule { }
