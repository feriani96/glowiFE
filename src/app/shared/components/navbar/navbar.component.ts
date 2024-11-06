import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';
import { AdminService } from 'src/app/features/admin/services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  categories$ = this.adminService.categories$;

  @Input() isCustomerLoggedIn: boolean = false;
  @Input() isAdminLoggedIn: boolean = false;

  categories: any[] = [];
  selectedCategory: string | null = null;

  

  isMobile = false;
  isNavbarVisible: boolean = window.innerWidth > 991; 

  isOffcanvasOpen: boolean = false;
  
  ngOnInit() { 
    this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    
    this.loadCategories(); 
  }

  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  constructor(private router : Router,
    private authService: AuthService,
    private adminService: AdminService
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
      
      // Remplacer getFilledCategories par getProducts
      this.authService.getProducts().subscribe((products: any[]) => {
        console.log('Products:', products);
        
        const categoriesWithProducts = categories.filter((category: any) =>
          products.some((product: any) => product.categoryId === category.id) // Assurez-vous que le champ utilisé est correct
        );
        
        this.categories = categoriesWithProducts;
        console.log('Filtered Categories:', this.categories);
      }, error => {
        console.error('Erreur lors de la récupération des produits:', error);
      });
    }, error => {
      console.error('Erreur lors de la récupération des catégories:', error);
    });
  }
  

  resetSelection() {
    this.selectedCategory = null;
}
}
