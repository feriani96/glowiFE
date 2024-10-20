import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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


  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.getCart();
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


}
