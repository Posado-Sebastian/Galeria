import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'iconos-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="galeria-iconos">
      <ng-container *ngIf="!isMobile; else mobileCarousel">
        <div class="galeria-iconos-img-container" *ngFor="let img of images; let i = index">
          <img [src]="img.src"
               [alt]="img.title"
               (click)="openModal(img)"
               [ngClass]="{'middle-img': i === 1}">
        </div>
      </ng-container>
      <ng-template #mobileCarousel>
        <div class="galeria-iconos-img-container">
          <img [src]="images[currentIndex].src"
               [alt]="images[currentIndex].title"
               (click)="openModal(images[currentIndex])"
               [@fadeInOut]
               [attr.key]="currentIndex">
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./iconos-carousel.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('400ms ease', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class IconosCarousel implements OnInit, OnDestroy {
  @Input() images: any[] = [];
  @Output() imageClick = new EventEmitter<any>();

  currentIndex = 0;
  carouselInterval: any;
  isMobile = false;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.updateIsMobile();
      window.addEventListener('resize', this.handleResize);
      if (this.isMobile) this.startCarousel();
    }
  }

  ngOnDestroy() {
    this.stopCarousel();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize = () => {
    this.updateIsMobile();
    if (this.isMobile) {
      this.startCarousel();
    } else {
      this.stopCarousel();
    }
  };

  updateIsMobile() {
    this.isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  }

  startCarousel() {
    if (this.carouselInterval || !this.isMobile) return;
    this.carouselInterval = setInterval(() => {
      this.nextImg();
    }, 2500);
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  nextImg() {
    if (this.currentIndex < this.images.length - 1) this.currentIndex++;
    else this.currentIndex = 0;
  }

  openModal(img: any) {
    this.imageClick.emit(img);
  }
}
