import { Component } from '@angular/core';

import { NavComponent } from './shared/nav/nav.component';

@Component({
  selector: 'app-content',
  templateUrl: 'app/app.component.html',
  viewProviders: [ NavComponent ]
})
export class AppComponent {
  message = 'Suh dude?';
}
