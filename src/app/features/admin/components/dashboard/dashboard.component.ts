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
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.searchProductFrom = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

  // Function to retrieve products from the API
  getProducts(): void {
    this.adminService.getAllProducts().subscribe(
      (res) => {
        console.log('API response:', res);
        this.products = res;
        console.log('Retrieved products:', this.products);

        this.products.forEach((product: any) => {
          console.log('Product:', product);
          // Initialize the default image for each product
          this.selectedImages[product.id] = 0;
        });
      },
      (error) => {
        console.error('Error retrieving products:', error);
        this.snackBar.open('Error loading products', 'Close', {
          duration: 3000
        });
      }
    );
  }

  // Function to submit the search form
  submitForm(): void {
    if (this.searchProductFrom.invalid) {
      this.snackBar.open('Please enter a valid keyword', 'Close', {
        duration: 3000
      });
      return;
    }

    const title = this.searchProductFrom.get('title')!.value;
    this.adminService.getAllProductByName(title).subscribe(
      (res) => {
        console.log('API response:', res);
        this.products = res;
        this.products.forEach((product: any) => {
          this.selectedImages[product.id] = 0;
        });
      },
      (error) => {
        console.error('Error retrieving products:', error);
        this.snackBar.open('Error loading products', 'Close', {
          duration: 3000
        });
      }
    );
  }

  // Function to get the current image URL
  currentImageUrl(product: any): string {
    return product.imageUrls[this.selectedImages[product.id] || 0];
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

  // Stop image rotation when the mouse leaves the product
  stopImageRotation(): void {
    clearInterval(this.imageRotationInterval);
  }
}
