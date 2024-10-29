import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {

  orderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null],
    })
  }

  placeOrder() {
    this.customerService.placeOrder(this.orderForm.value).subscribe(res => {
      if (res.id != null) {
        this.snackBar.open("Order Placed Successfully", "close", { duration: 5000 });
        this.dialog.closeAll();
        this.router.navigateByUrl("customer/my-orders");
      } else {
        this.snackBar.open("Something Went Wrong", "close", { duration: 5000 });
      }
    });
  }


  closeFrom() {
    this.dialog.closeAll();
  }
}
