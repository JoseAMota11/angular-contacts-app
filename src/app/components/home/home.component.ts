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
      <p *ngIf="loading" class="loading">Loading...</p>
      <app-contacts
        #elseBlock
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
  loading = true;

  constructor() {
    this.contactsService
      .getAllContacts()
      .then((response) => {
        localStorage.setItem('data', JSON.stringify(response.reverse()));
        this.contactList = response.reverse();
      })
      .catch((_) => {
        const dataStoredInLocalStorage = localStorage.getItem('data');
        if (dataStoredInLocalStorage !== null) {
          this.contactList = JSON.parse(dataStoredInLocalStorage);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
