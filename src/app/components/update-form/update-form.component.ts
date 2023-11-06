import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-update-form',
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
        <div>
          <button type="submit">Update</button>
          <button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </section>
  `,
  styleUrls: ['./update-form.component.scss'],
})
export class UpdateFormComponent implements OnInit {
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
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.contactsService
      .getContactById(Number(this.route.snapshot.params['id']))
      .then((response) => {
        this.form.get('firstName')?.setValue(response?.firstName!);
        this.form.get('lastName')?.setValue(response?.lastName!);
        this.form.get('phoneNumbers')?.setValue(response?.phoneNumbers!);
      });
  }

  onSubmit() {
    this.contactsService
      .updateContact(Number(this.route.snapshot.params['id']), this.form.value)
      .then((response) => {
        if (response.ok) {
          this.router.navigate(['/']);
        } else {
          console.error('Server responded with an error');
        }
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
