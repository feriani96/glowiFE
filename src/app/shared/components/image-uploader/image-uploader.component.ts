import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {
  @Input() imagePreviews: string[] = ['', '', '', ''];
  @Input() mainImagePreview: string = 'assets/images/productAvatar.png';

  @Input() showUpdateButton: boolean = false;
  @Output() imageSelected = new EventEmitter<(File | null)[]>();
  @Output() imageRemoved = new EventEmitter<number>();
  @Output() imageUpdated = new EventEmitter<number>();
  @ViewChild('fileInput') fileInput: any;

  selectedFiles: (File | null)[] = [null, null, null, null];


  // Opens the file selector for a given index
  triggerFileInput(index: number): void {
    const fileInput = document.getElementById(`fileInput-${index}`) as HTMLInputElement;
    fileInput.click();
  }

  // When files are selected
  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      if (file) {
        this.selectedFiles[index] = file;
        this.previewImage(file, index);
        this.imageSelected.emit(this.selectedFiles);
      }
    }
  }

  // Generates previews for selected files
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

  // Sets the main image
  setMainImage(index: number): void {
    this.mainImagePreview = this.imagePreviews[index];
  }

  // Removes an image
  removeImage(index: number): void {
    this.imagePreviews[index] = '';
    this.selectedFiles[index] = null;

    this.imageRemoved.emit(index);
    this.imageSelected.emit(this.selectedFiles);

    if (this.imagePreviews.every(img => img === '')) {
      this.mainImagePreview = 'assets/images/productAvatar.png';
    } else if (this.mainImagePreview === this.imagePreviews[index]) {
      this.mainImagePreview = this.imagePreviews.find(img => img) || 'assets/images/productAvatar.png';
    }
    this.imageSelected.emit(this.selectedFiles);
  }

  // Triggers the file input to update an image
  updateImage(index: number): void {
    this.triggerFileInput(index);
  }
}
