import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';

@Component({
  selector: 'app-review-ordered-product',
  templateUrl: './review-ordered-product.component.html',
  styleUrls: ['./review-ordered-product.component.css']
})
export class ReviewOrderedProductComponent {

  productId: string = this.activatedRoute.snapshot.params['productId'];
  reviewForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(){
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0]
    this.previewImage();
  }

  previewImage(){
    if (this.selectedFile) {  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile); 
    }
  }

  submitForm(){
    const formData: FormData = new FormData(); 
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('productId', this.productId.toString());
    formData.append('userId', UserStorageService.getUserId().toString()); 
    formData.append('rating', this.reviewForm.get('rating')?.value);
    formData.append('description', this.reviewForm.get('description')?.value);

    this.customerService.giveReview(formData).subscribe(res=>{
      if(res.id != null){
        this.snackBar.open('Review Posted Successfully!', 'Close',{
          duration: 5000
        });
        this.route.navigateByUrl('/customer/my_orders')
      }else{
        this.snackBar.open('Something Went Wrong!', 'Close',{
          duration: 5000
        });
      }
    })




  }
}
