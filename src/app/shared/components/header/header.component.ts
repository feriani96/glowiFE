import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() isCustomerLoggedIn: boolean = false;
  @Input() isAdminLoggedIn: boolean = false;
    
  searchQuery: string = '';
  isNavbarVisible: boolean = window.innerWidth > 991; 
  isMobile: boolean = window.innerWidth < 768; 

  constructor(private router : Router) {
    this.checkWindowSize(); 
  }


  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isNavbarVisible = window.innerWidth > 991; 
    this.isMobile = window.innerWidth < 900; 
  }
  
  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Rechercher:', this.searchQuery);
      // Par exemple, pour naviguer vers une page de résultats :
      // this.router.navigate(['/recherche'], { queryParams: { query: this.searchQuery } });
    }
  }
}
