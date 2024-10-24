import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit() {
    this.getPlacedOrders();
  }


  getPlacedOrders(){
    this.adminService.getPlacedOrders().subscribe(res =>{
      this.orders= res;
    })
  }
}
