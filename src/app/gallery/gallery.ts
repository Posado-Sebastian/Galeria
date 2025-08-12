

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
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
  principalLoading = true;
  miniaturasLoading: boolean[] = [];
  modalOpen = false;
  modalImg = '';
  modalTitle = '';
  modalDesc = '';

  paisajes: any[] = [];

  imagenActiva = 0;

  viejoMuelle: any[] = [];
  viejoMuelleLoading: boolean[] = [true, true, true];

  cambiarImagen(index: number) {
    this.imagenActiva = index;
  }

  onPaisajeClick(img: any) {
    this.modalImg = img.src;
    this.modalTitle = img.title;
    this.modalDesc = img.desc;
    this.modalOpen = true;
    document.body.classList.add('modal-abierto');
  }

  images: any[] = [];




  onIconoClick(img: any) {
    const found = this.images.find(i => i.src === img.src);
    this.modalImg = img.src;
    this.modalTitle = found?.title || '';
    this.modalDesc = found?.desc || '';
    this.modalOpen = true;
    document.body.classList.add('modal-abierto');
  }

  constructor(private http: HttpClient, private location: Location) {}

  ngOnInit() {
    setTimeout(() => {
      if (window.location.hash === '#top') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, 0);
    this.http.get<any[]>('assets/data/paisajes.json').subscribe(data => {
      this.paisajes = data;
      this.miniaturasLoading = Array(Math.max(0, data.length - 1)).fill(true);
      this.principalLoading = true;
    });
    this.http.get<any[]>('assets/data/iconos.json').subscribe(data => {
      this.images = data;
    });
    this.http.get<any[]>('assets/data/ViejoMuelle.json').subscribe(data => {
      this.viejoMuelle = data;
  this.viejoMuelleLoading = Array(Math.min(3, data.length)).fill(true);
    });
  }
  onViejoMuelleLoad(idx: number) {
    this.viejoMuelleLoading[idx] = false;
  }
  isViejoMuelleLoading(idx: number): boolean {
    return this.viejoMuelleLoading[idx];
  }

  onPrincipalLoad() {
    this.principalLoading = false;
  }

  onMiniaturaLoad(idx: number) {
  this.miniaturasLoading[idx] = false;
  }

  isMiniaturaLoading(idx: number): boolean {
    return this.miniaturasLoading[idx];
  }
  ngOnDestroy() {}

  openModal(img: string) {
    const found = this.images.find(i => i.src === img);
    this.modalImg = img;
    this.modalTitle = found?.title || '';
    this.modalDesc = found?.desc || '';
    this.modalOpen = true;
    document.body.classList.add('modal-abierto');
  }

  closeModal() {
    this.modalOpen = false;
    this.modalImg = '';
    this.modalTitle = '';
    this.modalDesc = '';
    document.body.classList.remove('modal-abierto');
  }
}