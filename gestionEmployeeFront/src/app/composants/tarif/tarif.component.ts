import { Component, OnInit } from '@angular/core';
import { EmployesService } from '../../services/employes.service';

@Component({
  selector: 'app-tarif',
  standalone: false,
  templateUrl: './tarif.component.html',
  styleUrl: './tarif.component.css'
})
export class TarifComponent implements OnInit {
  tarifs: any[] = [];
  newTarif = { type_jour: '', tarif: '' };

  constructor(private employesService: EmployesService) {}

  ngOnInit(): void {
    this.recupererTarifs();
  }

  recupererTarifs() {
    this.employesService.getTarifs().subscribe(data => {
      this.tarifs = data;
    });
  }

  ajouterTarif() {
    this.employesService.ajouterTarif(this.newTarif).subscribe(() => {
      this.recupererTarifs();
      this.newTarif = { type_jour: '', tarif: '' };
    });
  }

  supprimerTarif(id: number) {
    this.employesService.supprimerTarif(id).subscribe(() => {
      this.recupererTarifs();
    });
  }
}