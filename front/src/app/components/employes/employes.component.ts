import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employes',
  standalone: false,
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.css'
})
export class EmployesComponent implements OnInit {

  employes: any[] = [];
  newEmploye = { nom: '', prenom: '', poste: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEmployes();
  }

  getEmployes() {
    this.http.get<any[]>('http://localhost:8086/employe/employes').subscribe(data => {
      this.employes = data;
    });
  }

  ajouterEmploye() {
    this.http.post('http://localhost:8086/employe/employes', this.newEmploye).subscribe(() => {
      this.getEmployes();
      this.newEmploye = { nom: '', prenom: '', poste: '' };
    });
  }

  supprimerEmploye(id: number) {
    this.http.delete(`http://localhost:8086/employe/employes/${id}`).subscribe(() => {
      this.getEmployes();
    });
  }
}
