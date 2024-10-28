import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.css']
})
export class ViewWishlistComponent {

  products: any[] = [];

  constructor(private customerService: CustomerService){}


  ngOnInit() {
    this.getWishlistByUserId();
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
