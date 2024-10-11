import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { AngularMaterialModule } from '../AngularMaterialModule';



@NgModule({
  declarations: [
    ImageUploaderComponent,
  ],
  
  imports: [
    CommonModule,
    AngularMaterialModule
  ],

  exports: [
    ImageUploaderComponent,
  ]
})
export class SharedModule { }
