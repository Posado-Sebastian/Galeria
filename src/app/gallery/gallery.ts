import { Component, OnInit, OnDestroy } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { IconosCarousel } from '../iconos-carousel/iconos-carousel';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    ]),
    trigger('modalFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0 }))
      ])
    ]),
    trigger('modalScale', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms cubic-bezier(.25,.8,.25,1)', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(.25,.8,.25,1)', style({ transform: 'scale(0.8)', opacity: 0 }))
      ])
    ])
  ]
})
export class Gallery implements OnInit, OnDestroy {
  modalOpen = false;
  modalImg = '';
  modalTitle = '';
  modalDesc = '';

  paisajes: any[] = [];

  imagenActiva = 0;

  cambiarImagen(index: number) {
    this.imagenActiva = index;
  }

  onPaisajeClick(img: any) {
    this.modalImg = img.src;
    this.modalTitle = img.title;
    this.modalDesc = img.desc;
    this.modalOpen = true;
  }

  images: any[] = [];




  onIconoClick(img: any) {
    const found = this.images.find(i => i.src === img.src);
    this.modalImg = img.src;
    this.modalTitle = found?.title || '';
    this.modalDesc = found?.desc || '';
    this.modalOpen = true;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/data/paisajes.json').subscribe(data => {
      this.paisajes = data;
    });
    this.http.get<any[]>('assets/data/iconos.json').subscribe(data => {
      this.images = data;
    });
  }
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