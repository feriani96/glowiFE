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

  changeOrderStatus(orderId: string, status: string){
    this.adminService.changeOrderStatus(orderId,status).subscribe(res=>{
      if(res.id != null){
        this.snackBar.open('Order Status Changed Successfully.', 'close', { duration: 5000 });
        this.getPlacedOrders();
      }else{
        this.snackBar.open('Something Went Wrong!', 'close', { duration: 5000 });
      }
    })
  }
}
