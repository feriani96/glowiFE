import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.css']
})
export class ViewProductDetailComponent {

  productId: string = this.activatedRoute.snapshot.params['productId'];
  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];

  selectedImageIndex: number = 0; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit() {
    this.getProductDetailById();
  }

  getProductDetailById(){
    this.customerService.getProductDetailById(this.productId).subscribe(res =>{
      this.product = res.productDto;
      this.FAQS = res.faqDtoList;
      this.reviews = [];

      //image reviews
      res.reviewDtoList.forEach((element: any) => { 
        element.processedImg = 'data:image/png;base64,' + element.returnedImg; 
        this.reviews.push(element);
      });
    })
  }

  //image product
  setSelectedImage(index: number) {
    this.selectedImageIndex = index;
  }

}
