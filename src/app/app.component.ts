import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeComponent: string = 'getAllUser';

  changeComponent(componentName: string): void {
    this.activeComponent = componentName;
  }
}
