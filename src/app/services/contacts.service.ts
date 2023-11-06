import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  URL = 'http://localhost:3000/contacts';

  constructor() {}

  async getAllContacts(): Promise<Contact[]> {
    const data = await fetch(this.URL);
    return await data.json();
  }

  async getContactById(id: number): Promise<Contact[] | undefined> {
    const data = await fetch(`${this.URL}/${id}`);
    return await data.json();
  }

  async setContact(contact: unknown) {
    return await fetch(this.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
  }

  async deleteContact(id: number) {
    return await fetch(`${this.URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  }
}
