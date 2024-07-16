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
    this.showScrollToTopButton = window.pageYOffset > 300; // Adjust the value as needed
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
