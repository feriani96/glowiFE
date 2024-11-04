import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [this.data.name, [Validators.required]], 
      description: [this.data.description, [Validators.required]] 
    });
  }

  updateCategory(): void {
    if (this.categoryForm.valid) {
      const formData: FormData = new FormData();
      formData.append('name', this.categoryForm.get('name')!.value);
      formData.append('description', this.categoryForm.get('description')!.value);
      
      this.adminService.updateCategory(this.data.id, formData).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Category updated successfully!', 'Close', {
            duration: 5000
          });
          // Close the dialog and pass true to indicate success
          this.dialogRef.close(true);
        } else {
          this.snackBar.open(res.message, 'Fermer', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
          this.dialogRef.close(false); // Close with false if there was an error
        }
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
  

  onSave(): void {
    this.updateCategory();
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
