import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="container-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label for="firstName">
          First Name
          <input
            formControlName="firstName"
            type="text"
            id="firstName"
            placeholder="Ex: John"
          />
        </label>
        <label for="lastName">
          Last Name
          <input
            formControlName="lastName"
            type="text"
            id="lastName"
            placeholder="Ex: Doe"
          />
        </label>
        <label for="phoneNumbers">
          Phone Numbers
          <textarea
            formControlName="phoneNumbers"
            id="phoneNumbers"
            placeholder="Ex: 000-000-0000, 000-000-0000"
          ></textarea>
        </label>
        <button type="submit">{{ buttonText }}</button>
      </form>
    </section>
  `,
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    phoneNumbers: new FormControl('', Validators.required),
  });
  contactsService: ContactsService = inject(ContactsService);
  currentRoute: ActivatedRoute = inject(ActivatedRoute);
  buttonText: string = 'Add';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.currentRoute.snapshot.params['id']) {
      this.buttonText = 'Update';
      this.contactsService
        .getContactById(Number(this.currentRoute.snapshot.params['id']))
        .then((response) => {
          this.form.get('firstName')?.setValue(response?.firstName!);
          this.form.get('lastName')?.setValue(response?.lastName!);
          this.form.get('phoneNumbers')?.setValue(response?.phoneNumbers!);
        });
    }
  }

  onSubmit() {
    if (this.currentRoute.snapshot.params['id']) {
      this.contactsService
        .updateContact(
          Number(this.currentRoute.snapshot.params['id']),
          this.form.value
        )
        .then((response) => {
          if (response.ok) {
            this.router.navigate(['/']);
          } else {
            console.error('Server responded with an error');
          }
        });
    } else {
      this.contactsService.setContact(this.form.value).then((response) => {
        if (response.ok) {
          this.router.navigate(['/']);
        } else {
          console.error('Server responded with an error');
        }
      });
    }
  }
}
