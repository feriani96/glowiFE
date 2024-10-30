import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { AngularMaterialModule } from '../AngularMaterialModule';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
    NavbarComponent
  ],
  
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule

  ],

  exports: [
    ImageUploaderComponent,
    HeaderComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
