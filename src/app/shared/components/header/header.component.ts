import { Component, HostListener, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';
import { CustomerService } from 'src/app/features/customer/services/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() isCustomerLoggedIn: boolean = false;
  @Input() isAdminLoggedIn: boolean = false;

  searchProductFrom!: FormGroup;

  products: any = [];
  
  searchQuery: string = '';
  isNavbarVisible: boolean = window.innerWidth > 991; 
  isMobile: boolean = window.innerWidth < 768; 

  constructor(private router : Router,
    private fb: FormBuilder,
    private customerService: CustomerService,


  ) {
    this.checkWindowSize(); 
  }

  ngOnInit(): void {
    this.getProducts();  
    this.searchProductFrom = this.fb.group({
      title: [null]
    });
  }

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
      }
    );
  }

  resetSearch(): void {
    this.searchProductFrom.get('title')?.setValue('');  
    this.getProducts(); 
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
  
  // Function to retrieve all products from the API
  getProducts(): void {
    this.customerService.getAllProducts().subscribe(
      (res) => {
        this.products = res;

      }
    );
  }
}
