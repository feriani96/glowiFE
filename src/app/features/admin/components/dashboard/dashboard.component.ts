import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe((data : any) => {
    this.products= data;

    console.log(data.imgUrls)}  
  )};
  
}
