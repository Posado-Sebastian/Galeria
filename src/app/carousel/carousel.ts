import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
  standalone: true
})
export class Carousel {
  images = [
    'assets/img/slide1.jpg',
    'assets/img/slide2.jpg',
    'assets/img/slide3.jpg'
  ];
  current = 0;
  transitioning = false;
  fade = true;

  setFade() {
    this.fade = false;
    setTimeout(() => this.fade = true, 10);
  }

  prev() {
    if (this.transitioning) return;
    this.transitioning = true;
    this.current = (this.current === 0) ? this.images.length - 1 : this.current - 1;
    this.setFade();
    setTimeout(() => this.transitioning = false, 400);
  }

  next() {
    if (this.transitioning) return;
    this.transitioning = true;
    this.current = (this.current === this.images.length - 1) ? 0 : this.current + 1;
    this.setFade();
    setTimeout(() => this.transitioning = false, 400);
  }

  ngOnInit() {
    this.fade = true;
  }
}
