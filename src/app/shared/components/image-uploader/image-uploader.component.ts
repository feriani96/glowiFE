import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {
  @Output() imageSelected = new EventEmitter<(File | null)[]>();
  @ViewChild('fileInput') fileInput: any;

  selectedFiles: (File | null)[] = [null, null, null, null];  
  imagePreviews: string[] = ['', '', '', ''];  
  mainImagePreview: string = 'assets/images/productAvatar.png';  

  // Ouvre le sélecteur de fichiers pour un index donné
  triggerFileInput(index: number): void {
    const fileInput = document.getElementById(`fileInput-${index}`) as HTMLInputElement;
    fileInput.click();
  }

  // Lors de la sélection des fichiers
  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      if (file) {
        this.selectedFiles[index] = file;
        this.previewImage(file, index);
        this.imageSelected.emit(this.selectedFiles);
        console.log(this.selectedFiles)
      }
    }
  }

  // Générer des aperçus pour les fichiers sélectionnés
  previewImage(file: File, index: number): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews[index] = reader.result as string;
      if (index === 0) {
        this.mainImagePreview = reader.result as string;  
      }
    };
    reader.readAsDataURL(file);
  }

  // Met à jour l'image principale lors du clic sur une image secondaire
  setMainImage(index: number): void {
    this.mainImagePreview = this.imagePreviews[index];
  }

  // Supprime une image
  removeImage(index: number): void {
    this.imagePreviews[index] = '';
    this.selectedFiles[index] = null;
    if (this.imagePreviews.every(img => img === '')) {
      this.mainImagePreview = 'assets/images/productAvatar.png';
    } else if (this.mainImagePreview === this.imagePreviews[index]) {
      this.mainImagePreview = this.imagePreviews.find(img => img) || 'assets/images/productAvatar.png';
    }
    this.imageSelected.emit(this.selectedFiles);
  }
}
