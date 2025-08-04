
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Carousel } from './carousel/carousel';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Carousel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Proyecto');
}
