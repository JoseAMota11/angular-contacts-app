import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from 'src/app/interfaces/contacts';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="contact-card">
      <h3>{{ contact.firstName }} {{ contact.lastName }}</h3>
      <p>{{ contact.phoneNumbers }}</p>
      <div class="contact-card--buttons">
        <button type="button" class="card--buttons__delete" (click)="delete()">
          Delete
        </button>
        <button type="button" class="card--buttons__edit" (click)="update()">
          Edit
        </button>
      </div>
    </section>
  `,
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  @Input() contact!: Contact;
  contactsService: ContactsService = inject(ContactsService);

  constructor(private router: Router) {}

  delete() {
    this.contactsService.deleteContact(this.contact.id).then((response) => {
      if (response.ok) {
        /* 
          I don't know how to tell the component to refresh after
          a contact is deleted. I don't think this is the best
          solution but by now I'll use a window.location.reload();
          to refresh the page.

          PD: I'm a newbie to Angular :)
        */

        window.location.reload();
      }
    });
  }

  update() {
    this.router.navigate(['update-contact', this.contact.id]);
  }
}
