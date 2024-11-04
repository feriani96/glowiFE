import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent {
  categories: any[] = [];

  constructor(private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.adminService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  openEditDialog(category: any): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: category 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Catégorie mise à jour avec succès', 'Fermer', {
          duration: 3000
        });
        this.loadCategories(); // Refresh the category list
      } else {
        // Optionally handle cancellation or error here
        this.snackBar.open('Échec de la mise à jour de la catégorie', 'Fermer', {
          duration: 3000
        });
      }
    });
  }
  
  
  deleteCategory(categoryId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.adminService.deleteCategory(categoryId).subscribe(
        () => {
          this.snackBar.open('Catégorie supprimée avec succès', 'Fermer', {
            duration: 3000
          });
          this.loadCategories();
        },
        (error) => {
          this.snackBar.open('Erreur lors de la suppression de la catégorie', 'Fermer', {
            duration: 3000
          });
        }
      );
    }
  }
  


}