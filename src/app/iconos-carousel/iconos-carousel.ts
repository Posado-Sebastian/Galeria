import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'iconos-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './iconos-carousel.html',
  styleUrls: ['./iconos-carousel.css']
})
export class IconosCarousel implements OnInit, OnDestroy {
  loading: boolean[] = [];
  mobileLoading = true;
  opacity = 1;
  fade = true;
  @Input() images: any[] = [];
  @Output() imageClick = new EventEmitter<any>();

  currentIndex = 0;
  carouselInterval: any;
  isMobile = false;

  ngOnInit() {
    this.fade = true;
    this.loading = Array(this.images.length).fill(true);
    this.mobileLoading = true;
    if (typeof window !== 'undefined') {
      this.updateIsMobile();
      window.addEventListener('resize', this.handleResize);
      if (this.isMobile) this.startCarousel();
    }
  }

  onImgLoad(idx: number) {
    this.loading[idx] = false;
  }

  onMobileImgLoad() {
    this.mobileLoading = false;
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
      this.opacity = 0;
      this.mobileLoading = true;
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.opacity = 1;
        // mobileLoading se reinicia cuando la nueva imagen carga
      }, 400);
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