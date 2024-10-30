import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  searchQuery: string = '';
  isNavbarVisible: boolean = window.innerWidth > 991; 
  isMobile: boolean = window.innerWidth < 768; 

  constructor() {
    this.checkWindowSize(); 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isNavbarVisible = window.innerWidth > 991; 
    this.isMobile = window.innerWidth < 900; 
  }

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Rechercher:', this.searchQuery);
      // Par exemple, pour naviguer vers une page de résultats :
      // this.router.navigate(['/recherche'], { queryParams: { query: this.searchQuery } });
    }
  }
}
