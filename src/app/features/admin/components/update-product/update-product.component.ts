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
  imageSelected: string | null = 'assets/images/productAvatar.png';
  colors: string[] = ['Red', 'Green', 'Blue'];
  sizes: string[] = ['S', 'M', 'L', 'XL'];

  imgChanged=false;


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
      if (res.imageUrls && res.imageUrls.length > 0) {
        this.imagePreviews = res.imageUrls;
        this.selectedFiles = this.imagePreviews.map(() => null);
      } else {
        this.imagePreviews = ['', '', '', ''];
        this.selectedFiles = [null, null, null, null];
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


  // Si l'utilisateur n'a pas sélectionné de nouvelles images, incluez les anciennes images
  if (!this.imgChanged && this.imagePreviews.length > 0) {
    this.imagePreviews.forEach((url, index) => {
        formData.append(`image${index}`, url); // Vous pouvez aussi utiliser une logique pour passer les URL
    });
} else if (this.imgChanged && this.selectedFiles) {
    this.selectedFiles.forEach((file, index) => {
        if (file) {
            formData.append(`image${index}`, file);
        }
    });
}
      

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
    //this.selectedFiles = [null, null, null, null];

  }


}
