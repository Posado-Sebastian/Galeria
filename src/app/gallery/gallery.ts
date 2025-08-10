import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
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
export class Gallery implements OnInit, OnDestroy {
  modalOpen = false;
  modalImg = '';
  modalTitle = '';
  modalDesc = '';

  images = [
    {
      src: 'assets/img/Spinetta b.jpg',
      title: 'Spinetta',
      desc: 'Luis Alberto Spinetta, ícono del rock argentino.'
    },
    {
      src: 'assets/img/Charly a.jpg',
      title: 'Charly García',
      desc: 'Charly García, leyenda viva de la música nacional.'
    },
    {
      src: 'assets/img/JL A.jpg',
      title: 'Juan Luis',
      desc: 'Obra inspirada en la actitud y paisaje de Juan Luis.'
    }
  ];


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

  openModal(img: string) {
    const found = this.images.find(i => i.src === img);
    this.modalImg = img;
    this.modalTitle = found?.title || '';
    this.modalDesc = found?.desc || '';
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.modalImg = '';
    this.modalTitle = '';
    this.modalDesc = '';
  }
}
