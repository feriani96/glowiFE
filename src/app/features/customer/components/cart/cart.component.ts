import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: any[] = [];
  order: any;
  selectedImages: { [key: string]: number } = {};

  couponFrom!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.couponFrom = this.fb.group({
      code: [null, [Validators.required]]
    });
    this.getCart();
  }

  applyCoupon() {
    this.customerService.applyCoupon(this.couponFrom.get(['code'])!.value).subscribe(res => {
      this.snackBar.open("Coupon Applied Successfully", 'close', {
        duration: 5000
      });
      this.getCart();
    }, error => {
      this.snackBar.open(error.error, 'close', {
        duration: 5000
      });
    });
  }

  getCart() {
    this.cartItems =  []; 

    this.customerService.getCartByUserId().subscribe(res => {
      this.order = res;

      if (res.cartItems && res.cartItems.length > 0) {
        this.cartItems = res.cartItems;
      } else {
        this.cartItems = [];
        console.warn("No items in the cart.");
      }
    }, error => {
      console.error("Failed to fetch cart items:", error);
    });
  }

  currentImageUrl(item: any): string {
    return item.imageUrls && item.imageUrls.length > 0
      ? item.imageUrls[0]
      : 'default-image-url.jpg';
  }


  increaseQuantity(productId: any) {
    this.customerService.increaseProductQuantity(productId).subscribe(res => {
      this.snackBar.open('Product quantity increased.', 'clode', {duration:5000});
      
      this.getCart();
    })

  }

  decreaseQuantity(productId: any) {
    this.customerService.decreaseProductQuantity(productId).subscribe(res => {
      this.snackBar.open('Product quantity decreased.', 'clode', {duration:5000});
      
      this.getCart();
    })

  }

  placeOrder(){
    this.dialog.open(PlaceOrderComponent);
  }


}
