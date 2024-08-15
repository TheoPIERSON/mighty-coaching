import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('myTopnav')
  myTopnav!: ElementRef;
  isRotated = false;

  constructor(private renderer: Renderer2) {}

  toggleNavbar() {
    const x = this.myTopnav.nativeElement;
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }

    this.isRotated = !this.isRotated;
    const button = document.getElementById('toggle');
    if (this.isRotated) {
      button?.classList.add('rotated');
    } else {
      button?.classList.remove('rotated');
    }
  }
}
