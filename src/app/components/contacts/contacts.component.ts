import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from 'src/app/interfaces/contacts';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h3>{{ contact.firstName }} {{ contact.lastName }}</h3>
      <p>{{ contact.email }}</p>
    </section>
  `,
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  @Input() contact!: Contact;
}
