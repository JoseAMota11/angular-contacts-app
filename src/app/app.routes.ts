import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ContactsComponent } from './components/contacts/contacts.component';

export const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    title: 'Contacts App',
  },
  {
    path: 'new-contact',
    component: FormComponent,
    title: 'Create a new contact',
  },
];
