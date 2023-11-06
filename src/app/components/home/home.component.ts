import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from '../contacts/contacts.component';
import { RouterModule } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import { Contact } from 'src/app/interfaces/contacts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ContactsComponent, RouterModule],
  template: `
    <a routerLink="new-contact" class="link">Add a new contact</a>
    <section class="home-section">
      <app-contacts
        *ngFor="let contact of contactList"
        [contact]="contact"
      ></app-contacts>
    </section>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  contactList: Contact[] = [];
  contactsService: ContactsService = inject(ContactsService);

  constructor() {
    this.contactsService.getAllContacts().then((response) => {
      this.contactList = response.reverse();
    });
  }
}
