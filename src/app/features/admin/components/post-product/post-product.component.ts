import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.css']
})
export class PostProductComponent implements OnInit {
  productForm!: FormGroup;
  listOfCategories: any = [];
  selectedFiles: (File | null)[] = [null, null, null, null]; // Maximum de 4 fichiers d'images
  imagePreviews: string[] = ['', '', '', ''];  // Aperçus des images
  imageSelected: string | null = 'assets/images/productAvatar.png';
  colors: string[] = ['Red', 'Green', 'Blue'];
  sizes: string[] = ['S', 'M', 'L', 'XL'];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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

  addProduct(): void {
    if (this.productForm.valid) {
      console.log('Formulaire valide, envoi des données...');

      const formData: FormData = new FormData();
      formData.append('categoryId', this.productForm.get('categoryId')!.value);
      formData.append('name', this.productForm.get('name')!.value);
      formData.append('description', this.productForm.get('description')!.value);
      formData.append('price', this.productForm.get('price')!.value);
      formData.append('quantity', this.productForm.get('quantity')!.value);
      formData.append('availableSizes', JSON.stringify(this.productForm.get('availableSizes')!.value));
      formData.append('colors', JSON.stringify(this.productForm.get('colors')!.value));

      // Ajout des images sélectionnées
      this.selectedFiles.forEach((file, index) => {
        if (file) {
          formData.append(`image${index}`, file);
        }
      });

      console.log('FormData construit:', formData);
      
      this.adminService.addProduct(formData).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Produit publié avec succès !', 'Fermer', {
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

  onImageSelected(files: (File | null)[]): void {
    this.selectedFiles = files;
    console.log('Fichiers sélectionnés:', this.selectedFiles);
    this.imagePreviews = this.selectedFiles.filter((file): file is File => file !== null)
                                            .map((file: File) => URL.createObjectURL(file));
  
    console.log('Aperçus d\'images:', this.imagePreviews);
  }
  
}
