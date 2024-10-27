import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrls: ['./view-ordered-products.component.css']
})
export class ViewOrderedProductsComponent {
  
  orderId: any = this.activatedRoute.snapshot.params['orderId'];
  orderedProductsDetailsList: any[] = [];
  totalAmount: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
  ){}

  ngOnInit() {
    this.getOrdersProductDetailsByOrderId();
  }

  getOrdersProductDetailsByOrderId() {
    this.customerService.getOrderedProducts(this.orderId).subscribe(res => {
      console.log("Response: ", res);
      this.orderedProductsDetailsList = res.productDtoList; 
      this.totalAmount = res.orderAmount;
    });
  }

  currentImageUrl(product: any): string {
    return product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls[0]
      : 'default-image-url.jpg';
  }
}
