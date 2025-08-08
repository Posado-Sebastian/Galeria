import { Component } from '@angular/core';
import { Banner } from '../banner/banner';
import { Carousel } from '../carousel/carousel';
import { AboutMe } from '../about-me/about-me';
import { ContactSection } from '../contact-section/contact-section';

@Component({
  selector: 'app-home',
  imports: [Banner, Carousel, AboutMe, ContactSection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
