import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from 'src/app/interfaces/contacts';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="contact-card">
      <h3>{{ contact.firstName }} {{ contact.lastName }}</h3>
      <p>{{ phoneNumbers }}</p>
    </section>
  `,
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  @Input() contact!: Contact;
  phoneNumbers!: string | string[];

  constructor() {}

  ngOnInit(): void {
    if (this.contact.phoneNumbers.length > 1) {
      this.phoneNumbers = this.contact.phoneNumbers.join(' • ');
    } else {
      this.phoneNumbers = this.contact.phoneNumbers;
    }
  }
}
