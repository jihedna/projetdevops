import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  private apiUrl = 'http://localhost:8086/employe';  // Assure-toi que c'est bien l'URL de ton backend

  constructor(private http: HttpClient) { }

  // ✅ Employés
  getEmployes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employes`);
  }

  ajouterEmploye(employe: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employes`, employe);
  }

  supprimerEmploye(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/employes/${id}`);
  }

  // ✅ Heures Supplémentaires
  getHeuresSup(): Observable<any> {
    return this.http.get(`${this.apiUrl}/heures-sup`);
  }

  ajouterHeureSup(heureSup: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/heures-sup`, heureSup);
  }

  supprimerHeureSup(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/heures-sup/${id}`);
  }

  // ✅ Tarifs
  getTarifs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tarifs`);
  }

  ajouterTarif(tarif: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tarifs`, tarif);
  }

  supprimerTarif(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tarifs/${id}`);
  }
}

 
