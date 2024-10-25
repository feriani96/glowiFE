import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  productId = this.activatedRoute.snapshot.params['productId'];

  productForm!: FormGroup;
  listOfCategories: any = [];
  selectedFiles: (File | null)[] = [null, null, null, null];
  imagePreviews: string[] = ['', '', '', ''];
  mainImagePreview: string = '';
  colors: string[] = ['Red', 'Green', 'Blue'];
  sizes: string[] = ['S', 'M', 'L', 'XL'];

  removedImageIndices: number[] = [];
  imgChanged = false;


  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      availableSizes: [null, [Validators.required]],
      colors: [null, [Validators.required]],
    });
    this.getAllCategories();
    this.getProductById()
  }

  getAllCategories(): void {
    this.adminService.getAllCategories().subscribe(
      res => {
        this.listOfCategories = res;
      },
      error => {
        this.snackBar.open('Erreur lors de la récupération des catégories', 'Fermer', {
          duration: 5000
        });
      }
    );
  }

  getProductById() {
    this.adminService.getProductById(this.productId).subscribe(res => {
      this.productForm.patchValue(res);
      console.log(res)
      if (res.imageUrls && res.imageUrls.length > 0) {
        this.imagePreviews = res.imageUrls;
        this.mainImagePreview = res.imageUrls[0];
        this.onImagesSelected = res.imageUrls[0];
        this.selectedFiles = this.imagePreviews.map(() => null);
      }
    });
  }

  updateProduct(): void {
    if (this.productForm.valid) {
      const formData: FormData = new FormData();
      formData.append('categoryId', this.productForm.get('categoryId')!.value);
      formData.append('name', this.productForm.get('name')!.value);
      formData.append('description', this.productForm.get('description')!.value);
      formData.append('price', this.productForm.get('price')!.value);
      formData.append('quantity', this.productForm.get('quantity')!.value);
      formData.append('availableSizes', JSON.stringify(this.productForm.get('availableSizes')!.value));
      formData.append('colors', JSON.stringify(this.productForm.get('colors')!.value));

      if (this.imgChanged) {
        this.selectedFiles.forEach((file, index) => {
          if (file) {
            formData.append(`image${index}`, file);
          }
        });
      } else {
        this.imagePreviews.forEach((url, index) => {
          formData.append(`existingImageUrls[${index}]`, url);
        });
      }

      this.removedImageIndices.forEach(index => formData.append('removedImageIndices', index.toString()));

      this.adminService.updateProduct(this.productId, formData).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Produit updated avec succès !', 'Fermer', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open(res.message, 'Fermer', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onImagesSelected(files: (File | null)[]) {
    this.selectedFiles = files;

    this.imgChanged = true;

  }

  onImageRemoved(index: number) {
    this.removedImageIndices.push(index);
    this.imagePreviews[index] = '';
  }


}
