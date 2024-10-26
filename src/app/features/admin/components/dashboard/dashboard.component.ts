import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any = [];
  selectedImages: { [key: string]: number } = {};
  private imageRotationInterval: any;
  searchProductFrom!: FormGroup;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getProducts();  // Correct method to load products
    this.searchProductFrom = this.fb.group({
      title: [null]
    });
  }

  // Function to retrieve all products from the API
  getProducts(): void {
    this.adminService.getAllProducts().subscribe(
      (res) => {
        this.products = res;
        this.products.forEach((product: any) => {
          this.selectedImages[product.id] = 0;
        });
      },
      (error) => {
        console.error('Error retrieving products:', error);
      }
    );
  }

  // Function to handle search input changes
  onInputChange(): void {
    const searchValue = this.searchProductFrom.get('title')?.value;

    if (!searchValue || searchValue.trim().length === 0) {
      this.getProducts();
      return;
    }

    const lowercasedSearchValue = searchValue.toLowerCase();

    // Search products by name, using the lowercase string
    this.adminService.getAllProductByName(lowercasedSearchValue).subscribe(
      (res) => {
        this.products = res;

        this.products.forEach((product: any) => {
          this.selectedImages[product.id] = 0;
        });

        if (this.products.length === 0) {
          this.products = [];
        }
      },
      (error) => {
        console.error('Error retrieving products:', error);
        this.products = [];
      }
    );
  }

  // Function to reset the search and return to the initial state
  resetSearch(): void {
    this.searchProductFrom.get('title')?.setValue('');  
    this.getProducts(); 
  }

  currentImageUrl(product: any): string {
    return product.imageUrls && product.imageUrls.length > 0 
      ? product.imageUrls[this.selectedImages[product.id] || 0] 
      : 'assets/images/productAvatar.png';
  }
  

  // Start image rotation on hover
  startImageRotation(product: any): void {
    if (!this.selectedImages[product.id]) {
      this.selectedImages[product.id] = 0;
    }

    this.imageRotationInterval = setInterval(() => {
      this.selectedImages[product.id] = (this.selectedImages[product.id] + 1) % product.imageUrls.length;
    }, 1000);
  }

  // Stop image rotation when the mouse leaves the product element
  stopImageRotation(): void {
    clearInterval(this.imageRotationInterval);
  }

  // Function to delete a product
  deleteProduct(productId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
 
      this.adminService.deleteProduct(productId).subscribe(
        () => {
          this.snackBar.open('Produit supprimé avec succès', 'Fermer', {
            duration: 3000
          });
          this.getProducts(); // Recharge les produits après suppression
        },
        (error) => {
          this.snackBar.open('Erreur lors de la suppression du produit', 'Fermer', {
            duration: 3000
          });
        }
      );
    }
  }
}
