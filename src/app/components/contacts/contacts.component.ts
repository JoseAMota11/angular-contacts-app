import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a routerLink="new-contact" class="link">Add a new contact</a>
    <section>
      <h3></h3>
      <p></p>
    </section>
  `,
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {}
