import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  isModalOpen = false;

  constructor(private router: Router) {}

  confirmExit() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout() {
    this.isModalOpen = false;
    this.router.navigate(['/inicio']);
  }
}
