
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { ContactSection } from './contact-section/contact-section';
import { AboutMe } from './about-me/about-me';
import { Carousel } from './carousel/carousel';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ContactSection, AboutMe, Carousel],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Página');
}
