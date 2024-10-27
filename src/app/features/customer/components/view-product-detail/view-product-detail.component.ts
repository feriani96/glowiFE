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

      // Transformez les images des avis
      res.reviewDtoList.forEach((element: any) => { // Utilisez 'any' ici
        element.processedImg = 'data:image/png;base64,' + element.returnedImg; // Correction ici
        this.reviews.push(element); // Ajoutez l'élément transformé à la liste des avis
      });
    })
  }

  currentImageUrl(product: any): string {
    return product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls[0]
      : 'default-image-url.jpg';
  }

}
