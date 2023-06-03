import {
  Component,
  Inject,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { HomeService } from './home.service';
import { Product } from '../../mock/productList';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('mySlides', { read: ElementRef })
  mySlides?: ElementRef<HTMLDivElement>;

  imageTopTierSuggest: Product[] = [];
  // slideIndex: number;
  constructor(
    @Inject('HomeService') private homeService: HomeService,
    private elementRef: ElementRef
  ) {
    // this.slideIndex = 1;
    // this.showSlides(this.slideIndex);
  }

  ngAfterViewInit() {
    console.log(
      'this.elementRef.nativeElement',
      this.elementRef.nativeElement.getElementsByClassName('mySlides')
    );
    if (this.mySlides != null) {
      console.log('test', this.mySlides);
      this.mySlides.nativeElement.style.backgroundColor = 'red';
    }
  }

  ngOnInit(): void {
    this.homeService.getSuggestProduct().subscribe({
      next: (value: Product[]) => {
        this.imageTopTierSuggest = value.map((product) => {
          return {
            ...product,
            img:
              product.img != null
                ? `${environment.apiUrl}/images/${product.img}`
                : '/assets/images/noImage.jpg',
          };
        });
      },
    });
  }

  // currentSlide(n: number) {
  //   this.showSlides((this.slideIndex = n));
  // }

  // showSlides(n: number) {
  //   let i;
  //   let slides = document.getElementsByClassName(
  //     'mySlides'
  //   ) as HTMLCollectionOf<HTMLElement>;

  //   console.log('slides', slides);

  //   let dots = document.getElementsByClassName('dot');
  //   if (n > slides.length) {
  //     this.slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     this.slideIndex = slides.length;
  //   }
  //   for (i = 0; i < slides.length; i++) {
  //     slides[i].style.display = 'none';
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(' active', '');
  //   }
  //   slides[this.slideIndex - 1].style.display = 'block';
  //   dots[this.slideIndex - 1].className += ' active';
  // }
}
