import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

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
    private customerService: CustomerService,
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
    this.customerService.getAllProducts().subscribe(
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
    this.customerService.getAllProductByName(lowercasedSearchValue).subscribe(
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

  // Function to get the current image URL of a product
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

  // Stop image rotation when the mouse leaves the product element
  stopImageRotation(): void {
    clearInterval(this.imageRotationInterval);
  }

  addToCart(id: any) {
    this.customerService.addToCart(id).subscribe(
      res => {
        this.snackBar.open("Product Added To Cart Successfully", "Close", { duration: 5000 });
      },
      error => {
        console.error('Error adding product to cart', error); 
        this.snackBar.open("Failed to add product to cart", "Close", { duration: 5000 });
      }
    );
  }
  
}
