import { Component } from '@angular/core';

@Component({
  selector: 'app-root', //Defines the selectorName to import this component in other files
  templateUrl: './app.component.html', //Defines where we can find the associated html file.
  styleUrls: ['./app.component.css'] //Defines where we can find the associated styling file.
})
export class AppComponent {
  title = 'ElectricGo';
}
