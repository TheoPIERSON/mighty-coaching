import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-program-carousel',
  templateUrl: './program-carousel.component.html',
  styleUrls: ['./program-carousel.component.scss'],
})
export class ProgramCarouselComponent implements OnInit, OnDestroy {
  private items!: NodeListOf<HTMLElement>;
  private active = 1; // L'index de l'image centrale initiale
  private intervalId!: number;

  ngOnInit(): void {
    this.items = document.querySelectorAll(
      '.slider .item'
    ) as NodeListOf<HTMLElement>;
    this.loadShow();

    const next = document.getElementById('next');
    const prev = document.getElementById('prev');

    if (next && prev) {
      next.addEventListener('click', this.showNext.bind(this));
      prev.addEventListener('click', this.showPrev.bind(this));
    }

    // Ajouter le défilement automatique avec un délai de 3 secondes
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');

    if (next && prev) {
      next.removeEventListener('click', this.showNext.bind(this));
      prev.removeEventListener('click', this.showPrev.bind(this));
    }

    // Nettoyage de l'intervalle pour éviter les fuites de mémoire
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private loadShow(): void {
    const itemCount = this.items.length;
    const isSmallScreen = window.innerWidth <= 700;

    this.items.forEach((item, index) => {
      const offset = (index - this.active + itemCount) % itemCount;

      if (isSmallScreen) {
        // Sur un petit écran, seules les images centrales sont visibles
        if (offset === 0) {
          item.style.transform = 'translateX(0) scale(1)';
          item.style.zIndex = '1';
          item.style.filter = 'none';
          item.style.opacity = '1';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateX(0) scale(0)';
        }
      } else {
        // Comportement habituel sur grand écran
        if (offset === 0) {
          item.style.transform = 'translateX(0) scale(1)';
          item.style.zIndex = '1';
          item.style.filter = 'none';
          item.style.opacity = '1';
        } else if (offset === 1) {
          item.style.transform = `translateX(40%) scale(0.8)`;
          item.style.zIndex = '0';
          item.style.filter = 'blur(5px)';
          item.style.opacity = '0.6';
        } else if (offset === itemCount - 1) {
          item.style.transform = `translateX(-40%) scale(0.8)`;
          item.style.zIndex = '0';
          item.style.filter = 'blur(5px)';
          item.style.opacity = '0.6';
        } else {
          item.style.transform = 'translateX(-1000px)';
          item.style.opacity = '0';
        }
      }
    });
  }

  private showNext(): void {
    this.active = (this.active + 1) % this.items.length;
    this.loadShow();
  }

  private showPrev(): void {
    this.active = (this.active - 1 + this.items.length) % this.items.length;
    this.loadShow();
  }

  private startAutoSlide(): void {
    this.intervalId = window.setInterval(() => {
      this.showNext();
    }, 15000); // Défilement toutes les 3 secondes
  }
}
