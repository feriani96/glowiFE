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
  

  isMobile = false;
  isNavbarVisible: boolean = window.innerWidth > 991; 

  isOffcanvasOpen: boolean = false;
  
  ngOnInit() { // Ajoutez cette méthode
    this.loadCategories(); // Chargez les catégories au démarrage
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
      console.log(categories); // Vérifiez ce que vous obtenez ici
      this.categories = categories;
    });
  }

}
