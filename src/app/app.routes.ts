import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Contacts App',
  },
  {
    path: 'new-contact',
    component: FormComponent,
    title: 'Create a new contact',
  },
  {
    path: 'update-contact/:id',
    component: FormComponent,
    title: 'Updating contact',
  },
];
