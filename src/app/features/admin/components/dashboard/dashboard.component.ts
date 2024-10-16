import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any = [];
  selectedImage: string = ''; // Image sélectionnée

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.adminService.getAllProducts().subscribe(
      (res) => {
        this.products = res; // Stocke les produits dans la variable
        console.log('Produits récupérés:', this.products);
      },
      (error) => {
        console.error('Erreur de récupération des produits:', error);
      }
    );
  }
}

