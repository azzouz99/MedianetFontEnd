import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  @Output() projetChange = new EventEmitter<string>();
  selectedProjet: string = '';
  projets: string[] = ['Projet A', 'Projet B', 'Projet C', 'Projet D'];

  onProjetChange(event: any): void {
    this.projetChange.emit(event.value);
  }
}
