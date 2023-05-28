import { Component } from '@angular/core';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  openMenu = false;
  classMenu!: string;

  openMainMenu() {
    this.openMenu = !this.openMenu;
    this.classMenu = this.openMenu ? 'block' : 'hidden';
  }

}
