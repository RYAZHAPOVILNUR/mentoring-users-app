import {Component, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'users-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', path: '/', icon: 'fas fa-home' },
    { label: 'Todos', path: '/todos', icon: 'fas fa-list' },
    { label: 'Articles', path: '/articles', icon: 'fas fa-newspaper' },
    { label: 'Comments', path: '/comments', icon: 'fas fa-comments' },
    { label: 'Users', path: '/users', icon: 'fas fa-user' },
    { label: 'Teams', path: '/teams', icon: 'fas fa-users' },
    { label: 'Backlog', path: '/backlog', icon: 'fas fa-tasks' }
  ];
}


