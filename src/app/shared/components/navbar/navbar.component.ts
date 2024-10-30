import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMobile = false;
  isNavbarVisible: boolean = window.innerWidth > 991; 

  isOffcanvasOpen: boolean = false;

  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  constructor() {
    this.checkWindowSize();
    window.addEventListener('resize', () => this.checkWindowSize());
  }

  checkWindowSize() {
    this.isNavbarVisible = window.innerWidth > 991; 
    this.isMobile = window.innerWidth < 900; 
  }


}
