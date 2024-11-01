import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Input() isCustomerLoggedIn: boolean = false;
  @Input() isAdminLoggedIn: boolean = false;

  categories: any[] = [];
  selectedCategory: string | null = null;

  

  isMobile = false;
  isNavbarVisible: boolean = window.innerWidth > 991; 

  isOffcanvasOpen: boolean = false;
  
  ngOnInit() { 
    this.loadCategories(); 
  }

  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  constructor(private router : Router,
    private authService: AuthService
  ) {
    this.checkWindowSize();
    window.addEventListener('resize', () => this.checkWindowSize());
  }

  checkWindowSize() {
    this.isNavbarVisible = window.innerWidth > 991; 
    this.isMobile = window.innerWidth < 900; 
  }


  loadCategories() {
    this.authService.getCategories().subscribe((categories) => {
      console.log('Categories:', categories);
      this.authService.getFilledCategories().subscribe((products) => {
        console.log('Products:', products);
        // Assurez-vous que 'product.categoryId' est bien défini dans votre réponse
        const categoriesWithProducts = categories.filter((category: any) =>
          products.some((product: any) => product.id === category.id) // Vérifiez ici
        );
        this.categories = categoriesWithProducts;
        console.log('Filtered Categories:', this.categories);
      });
    });
  }
  
  

  resetSelection() {
    this.selectedCategory = null;
}
}
