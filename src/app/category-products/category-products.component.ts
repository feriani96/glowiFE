import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  categoryId: string | null = null;
  categoryName: string = '';
  products: any[] = [];
  selectedImages: { [key: string]: number } = {};
  private imageRotationInterval: any;



  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      console.log('Category ID:', this.categoryId);
      if (this.categoryId) {
        this.fetchCategoryDetails();
        this.fetchProductsByCategory(this.categoryId);
      }
    });
  }


  fetchCategoryDetails(): void {
    this.authService.getCategories().subscribe((categories: any) => {
      const category = categories.find((cat: any) => cat.id === this.categoryId);
      if (category) {
        this.categoryName = category.name;
      }
    });
  }

  fetchProductsByCategory(categoryId: string): void {
    this.authService.getProductsByCategory(categoryId).subscribe({
        next: (products: any) => {
            console.log('Fetched products:', products); // Ajoutez cette ligne
            this.products = products;
        },
        error: (err) => {
            console.error('Error fetching products:', err);
        }
    });
  }

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


}
