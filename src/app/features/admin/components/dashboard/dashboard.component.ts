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
  // Cette variable stocke l'image principale sélectionnée pour chaque produit
  selectedImages: { [key: string]: number } = {};
  private imageRotationInterval: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // Récupération des produits depuis l'API
  getProducts(): void {
    this.adminService.getAllProducts().subscribe(
      (res) => {
        console.log('Réponse de l\'API:', res);
        this.products = res; 
        console.log('Produits récupérés:', this.products);
  
        this.products.forEach((product: any) => {
          console.log('Produit:', product);
          // Initialiser l'image par défaut pour chaque produit
          this.selectedImages[product.id] = 0;
        });
      },
      (error) => {
        console.error('Erreur de récupération des produits:', error);
        this.snackBar.open('Erreur lors du chargement des produits', 'Fermer', {
          duration: 3000
        });
      }
    );
  }

  // Fonction pour obtenir l'URL de l'image actuelle
  currentImageUrl(product: any): string {
    return product.imageUrls[this.selectedImages[product.id] || 0];
  }

  // Démarrer la rotation des images au survol
  startImageRotation(product: any): void {
    // Réinitialiser l'index d'image pour chaque produit
    if (!this.selectedImages[product.id]) {
      this.selectedImages[product.id] = 0;
    }

    // Rotation des images toutes les secondes
    this.imageRotationInterval = setInterval(() => {
      this.selectedImages[product.id] = (this.selectedImages[product.id] + 1) % product.imageUrls.length;
    }, 1000);
  }

  // Arrêter la rotation des images lorsque la souris quitte le produit
  stopImageRotation(): void {
    clearInterval(this.imageRotationInterval);
  }
}
