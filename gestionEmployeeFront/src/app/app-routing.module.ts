import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployesComponent } from './components/employes/employes.component';
import { HeuresSupComponent } from './composants/heures-sup/heures-sup.component';
import { TarifComponent } from './composants/tarif/tarif.component';

const routes: Routes = [
  { path: '', redirectTo: 'employes', pathMatch: 'full' },
  { path: 'employes', component: EmployesComponent },
  { path: 'heures-sup', component: HeuresSupComponent },
  { path: 'tarif', component: TarifComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
