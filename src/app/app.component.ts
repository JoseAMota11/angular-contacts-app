import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ContactsComponent,
    RouterModule,
    FormComponent,
  ],
  template: `
    <nav class="navbar">
      <header class="navbar-header">
        <a routerLink="/" class="navbar-header--link">Contacts App</a>
      </header>
    </nav>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
