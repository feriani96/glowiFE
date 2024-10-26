import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { AngularMaterialModule } from '../AngularMaterialModule';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    ImageUploaderComponent,
    HeaderComponent,
  ],
  
  imports: [
    CommonModule,
    AngularMaterialModule
  ],

  exports: [
    ImageUploaderComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
