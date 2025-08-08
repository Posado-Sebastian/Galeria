import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Gallery } from './gallery/gallery';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'galeria', component: Gallery },
];
