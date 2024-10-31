import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() isCustomerLoggedIn: boolean = false;
  @Input() isAdminLoggedIn: boolean = false;

  isMobile = false;
  isNavbarVisible: boolean = window.innerWidth > 991; 

  isOffcanvasOpen: boolean = false;


  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  constructor(private router : Router) {
    this.checkWindowSize();
    window.addEventListener('resize', () => this.checkWindowSize());
  }

  checkWindowSize() {
    this.isNavbarVisible = window.innerWidth > 991; 
    this.isMobile = window.innerWidth < 900; 
  }


}
