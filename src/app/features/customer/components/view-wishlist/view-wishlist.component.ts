import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.css']
})
export class ViewWishlistComponent {

  products: any[] = [];
  userId: string | null = null;

  constructor(private customerService: CustomerService){
    this.userId = UserStorageService.getUserId();
  }


  ngOnInit() {
    this.getWishlistByUserId();
    this.userId = UserStorageService.getUserId();

  }

  getWishlistByUserId(){
    this.customerService.getWishlistByUserId().subscribe(res=>{
      console.log(res);
      this.products = res;
    })
  }

  currentImageUrl(product: any): string {
    return product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls[0]
      : 'default-image-url.jpg';
  }

}
