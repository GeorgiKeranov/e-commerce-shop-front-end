import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  emailForm: FormGroup;
  lat = 43.2377206;
  log = 27.8498493;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group({

    });
  }

  ngOnInit() {
  }

}
