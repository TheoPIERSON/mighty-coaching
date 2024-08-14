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

    this.items.forEach((item, index) => {
      const offset = (index - this.active + itemCount) % itemCount;

      if (offset === 0) {
        // Image centrale
        item.style.transform = 'translateX(0) scale(1)';
        item.style.zIndex = '1';
        item.style.filter = 'none';
        item.style.opacity = '1';
      } else if (offset === 1) {
        // Image à droite
        item.style.transform = `translateX(60%) scale(0.8)`;
        item.style.zIndex = '0';
        item.style.filter = 'blur(5px)';
        item.style.opacity = '0.6';
      } else if (offset === itemCount - 1) {
        // Image à gauche
        item.style.transform = `translateX(-60%) scale(0.8)`;
        item.style.zIndex = '0';
        item.style.filter = 'blur(5px)';
        item.style.opacity = '0.6';
      } else {
        // Les autres images sont cachées
        item.style.transform = 'translateX(-1000px)'; // Positionner hors de l'écran
        item.style.opacity = '0';
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
