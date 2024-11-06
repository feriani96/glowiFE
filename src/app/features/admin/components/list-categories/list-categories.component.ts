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
        this.snackBar.open('Category updated successfully!', 'Close', {
          duration: 3000
        });
        this.loadCategories(); 
      } else {
        this.snackBar.open('Failed to update the category', 'Close', {
          duration: 3000
        });
      }
    });
  }
  
  
  deleteCategory(categoryId: string): void {
    if (confirm('Are you sure you want to delete this category ?')) {
      this.adminService.deleteCategory(categoryId).subscribe(
        () => {
          this.snackBar.open('Category deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadCategories();
        },
        (error) => {
          this.snackBar.open('Error while deleting the category', 'Close', {
            duration: 3000
          });
        }
      );
    }
  }
  


}