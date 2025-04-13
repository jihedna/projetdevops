import { Component, OnInit } from '@angular/core';
import { EmployesService } from '../../services/employes.service';

@Component({
  selector: 'app-heures-sup',
  standalone: false,
  templateUrl: './heures-sup.component.html',
  styleUrl: './heures-sup.component.css'
})
export class HeuresSupComponent implements OnInit {
  heuresSup: any[] = [];
  newHeureSup = { employe_id: '', date: '', nb_heures: '' };

  constructor(private employesService: EmployesService) {}

  ngOnInit(): void {
    this.recupererHeuresSup();
  }

  recupererHeuresSup() {
    this.employesService.getHeuresSup().subscribe(data => {
      this.heuresSup = data;
    });
  }

  ajouterHeureSup() {
    this.employesService.ajouterHeureSup(this.newHeureSup).subscribe(() => {
      this.recupererHeuresSup();
      this.newHeureSup = { employe_id: '', date: '', nb_heures: '' };
    });
  }

  supprimerHeureSup(id: number) {
    this.employesService.supprimerHeureSup(id).subscribe(() => {
      this.recupererHeuresSup();
    });
  }
}