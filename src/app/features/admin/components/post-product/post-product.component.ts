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
  ) {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null],
      price: [null],
      description: [null],
      quantity: [null],
      availableSizes: [null],
      colors: [null],
      imgUrls: [null],
      
    });

  }

  ngOnInit(): void {
   


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

      console.log('FormData construit:', formData);

      // Ajout des images sélectionnées
      this.selectedFiles.forEach((file, index) => {
        console.log("in product", file, index);
        if (file) {
          formData.append(`image${index}`, file);
          console.log(`Image ${index} ajoutée:`, file); // Log pour chaque image ajoutée
        }
      });

       // Assurez-vous que les URLs sont correctement liées
    const imgUrls = this.selectedFiles.map((file, index) => file ? URL.createObjectURL(file) : null);
    formData.append('imgUrls', JSON.stringify(imgUrls));
    console.log('Img URLs ajoutées:', imgUrls);

      console.log('Form Data:', formData);
      console.log('Product Form Values:', this.productForm.value);
      this.adminService.addProduct(this.productForm.value).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Product Posted Successfully!', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.snackBar.open(res.message, 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      })

    }else{
      this.productForm.markAllAsTouched();
    }

  }

  // Gère les fichiers image sélectionnés
  onImageSelected(files: (File | null)[]): void {
    this.selectedFiles = files;
    console.log('Fichiers sélectionnés:', this.selectedFiles); // Log des fichiers sélectionnés
    // Create an array of file URLs or names to store in the form control
    const imageUrls = this.selectedFiles.map(file => file ? file.name : null);

    // Update the form control 'imgUrls' with the array of image URLs
    this.productForm.patchValue({
      imgUrls: imageUrls
    });
  
    console.log('Fichiers sélectionnés:', this.selectedFiles);
    console.log('URLs des images:', imageUrls);
  }
}
