import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconosCarousel } from '../iconos-carousel/iconos-carousel';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, IconosCarousel],
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

  paisajes = [
    { src: 'assets/img/1.jpg', alt: 'Paisaje 1' },
    { src: 'assets/img/2.jpg', alt: 'Paisaje 2' },
    { src: 'assets/img/3.jpg', alt: 'Paisaje 3' },
    { src: 'assets/img/4.jpg', alt: 'Paisaje 4' },
    { src: 'assets/img/5.jpg', alt: 'Paisaje 5' },
    { src: 'assets/img/6.jpg', alt: 'Paisaje 6' },
    { src: 'assets/img/7.jpg', alt: 'Paisaje 7' },
    { src: 'assets/img/8.jpg', alt: 'Paisaje 8' },
    { src: 'assets/img/9.jpg', alt: 'Paisaje 9' },
    { src: 'assets/img/10.jpg', alt: 'Paisaje 10' },
    { src: 'assets/img/11.jpg', alt: 'Paisaje 11' },
    { src: 'assets/img/12.jpg', alt: 'Paisaje 12' },
    { src: 'assets/img/13.jpg', alt: 'Paisaje 13' }
  ];

  imagenActiva = 0;

  cambiarImagen(index: number) {
    this.imagenActiva = index;
  }

  onPaisajeClick(img: any) {
    this.modalImg = img.src;
    this.modalTitle = img.alt;
    this.modalDesc = '';
    this.modalOpen = true;
  }

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




  onIconoClick(img: any) {
    const found = this.images.find(i => i.src === img.src);
    this.modalImg = img.src;
    this.modalTitle = found?.title || '';
    this.modalDesc = found?.desc || '';
    this.modalOpen = true;
  }

  ngOnInit() {}
  ngOnDestroy() {}

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
