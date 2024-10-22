import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

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

  decreaseQuantity(productId: any) {
    const item = this.cartItems.find(cartItem => cartItem.productId === productId);
    
    if (item && item.quantity > 1) { 
      item.quantity -= 1; 
      this.updateOrderTotal(-item.price); 
    }
  }

  increaseQuantity(productId: any) {
    const item = this.cartItems.find(cartItem => cartItem.productId === productId);
    
    if (item) {
      item.quantity += 1; 
      this.updateOrderTotal(item.price);
    }
  }

  updateOrderTotal(price: number) {
    if (this.order) {
      this.order.totalAmount += price;
      this.order.amount += price;
    }
  }
}
