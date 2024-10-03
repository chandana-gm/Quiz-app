import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent {
  nameForm!: FormGroup;
  formSubmitted = false;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(){
    this.initializeForm();
  }
  // Initialize the form group
  initializeForm(){
    this.nameForm = this.fb.group({
      name: ['', Validators.required]
    });
  }
  // form submission
  onSubmit() {
    this.formSubmitted = true;
    if (this.nameForm.valid) {
      localStorage.setItem("participant", this.nameForm.value.name)
      this.router.navigate(['quiz'])
      console.log("Form Submitted! Name:", this.nameForm.value.name);
      this.formSubmitted = false;
    }
  }
}
