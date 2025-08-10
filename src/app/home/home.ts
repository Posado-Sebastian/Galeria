import { Component } from '@angular/core';
import { Banner } from '../banner/banner';
import { Carousel } from '../carousel/carousel';
import { RouterLink } from '@angular/router';
import { Bio } from '../bio/bio';


@Component({
  selector: 'app-home',
  imports: [Banner, Carousel, RouterLink, Bio],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

}
