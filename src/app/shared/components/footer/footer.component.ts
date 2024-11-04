import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isCustomerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  categories: any[] = [];
  quickLinks: { name: string, path: string }[] = [];

  constructor(private authService: AuthService,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    this.loadQuickLinks();
    this.loadFilledCategories(); 
  }

  loadQuickLinks() {
    this.quickLinks = [
      { name: 'Home', path: '/home' },
      { name: 'Product', path: '/customer/dashboard' },
      { name: 'Track Order', path: '/order' },
      { name: 'Contact', path: '/contact' },
    ];
  }
  
  loadFilledCategories() {
    this.authService.getFilteredCategories().subscribe(
      (filledCategories) => {
        this.categories = filledCategories; 
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    );
  }



  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]); 
  }
}