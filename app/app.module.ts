import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { RouterModule }     from '@angular/router';
import { FormsModule }      from '@angular/forms';
import { NgSemanticModule } from 'ng-semantic';

import { AppComponent }     from './app.component';
import { routing,
      appRoutingProviders } from './app.routing';

import { NavComponent }     from './shared/nav/nav.component';
import { HomeComponent }    from './home/home.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgSemanticModule, routing ],
  declarations: [ AppComponent, NavComponent, HomeComponent ],
  providers:    [ appRoutingProviders ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
