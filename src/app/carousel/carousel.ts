import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from '@coreui/angular';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.html',
  standalone: true,
  imports: [
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselCaptionComponent,
    CarouselControlComponent,
    RouterLink
  ]
})
export class Carousel implements OnInit {
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: 'assets/img/slide1.jpg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: 'assets/img/slide2.jpg',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };
    this.slides[2] = {
      id: 2,
      src: 'assets/img/slide3.jpg',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    };
  }
}