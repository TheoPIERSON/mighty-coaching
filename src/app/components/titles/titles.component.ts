import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss'],
})
export class TitlesComponent {
  @Input() h1Text: string = ''; // Propriété d'entrée
}
