import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrls: ['./post-product-faq.component.css']
})
export class PostProductFaqComponent {

  productId: string = this.activatedRoute.snapshot.params["productId"];
  FAQForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.FAQForm = this.fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    })
  }

  postFAQ(){
    this.adminService.postFAQ(this.productId, this.FAQForm.value).subscribe(res =>{
      if(res.id != null){
        this.snackBar.open('FAQ Posted Successfully.', 'Close', {
          duration: 5000
        });
        this.router.navigateByUrl('/admin/dashboard');
      }else{
        this.snackBar.open('Something Went Wrong', 'Close', {
          duration: 5000, 
          panelClass: 'error-snackbar'
        });
      }
    }
  )}

}
