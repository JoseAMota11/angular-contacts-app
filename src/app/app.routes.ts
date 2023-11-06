import { Routes } from '@angular/router';
import { AddFormComponent } from './components/add-form/add-form.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Contacts App',
  },
  {
    path: 'new-contact',
    component: AddFormComponent,
    title: 'Create a new contact',
  },
  {
    path: 'update-contact/:id',
    component: UpdateFormComponent,
    title: 'Updating contact',
  },
];
