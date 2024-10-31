import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  currentIndex: number = 0;

  constructor(private router : Router) {
  }

  
  slides = [
    {
      src: 'assets/images/couverture.jpg',
      title: 'FIND YOUR PERFECT LOOK AND GLOW WITH CONFIDENCE!',
      link: 'shop.html'
    },
    {
      src: 'assets/images/couverture2.jpg',
      title: 'TRONSFORM YOUR LOOK EXPLORE OUR EXCLUSIVE COLLECTION!',
      link: 'shop.html'
    }
  ];

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}
