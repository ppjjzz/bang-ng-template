import { Component, OnInit } from '@angular/core';
import { AbsFormUtil } from '@app/abstract/form';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent extends AbsFormUtil implements OnInit {
  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.validateForm = this.fb.group({
      name: ['']
    });
  }
  onSubmit() {

  }
}
