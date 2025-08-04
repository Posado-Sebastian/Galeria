
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Carousel } from './carousel/carousel';
import { ContactSection } from './contact-section/contact-section';
import { AboutMe } from './about-me/about-me';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Carousel, ContactSection, AboutMe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Proyecto');
}
