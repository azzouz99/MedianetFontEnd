// navbar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  notifications = [
    { message: 'New comment on your post' },
    { message: 'New follower' },
    { message: 'Message from John' }
  ];
  showNotifications = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
