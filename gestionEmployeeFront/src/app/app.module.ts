import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployesComponent } from './components/employes/employes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeuresSupComponent } from './composants/heures-sup/heures-sup.component';
import { TarifComponent } from './composants/tarif/tarif.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployesComponent,
    HeuresSupComponent,
    TarifComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
