import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-btn',
  templateUrl: './scroll-btn.component.html',
  styleUrls: ['./scroll-btn.component.scss']
})
export class ScrollBtnComponent {

  showScrollToTopButton: boolean = false;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollToTopButton = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
