import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  hidePassword = true;  
  hideConfirmPassword = true; 
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }


  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

  onSubmit() {
    console.log("Form submitted"); 

    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password !== confirmPassword){
      this.snackBar.open("Passwords do not match.", "Close", {duration:5000, panelClass: "error-snackbar"});
      console.log("Passwords do not match");
      return;
    }
    console.log("Calling the register service");

    this.authService.register(this.signupForm.value).subscribe(
      (response)=>{
        console.log(response);
        this.snackBar.open("Sign up successful!", "close", {duration:5000});
        this.router.navigateByUrl("/login");
      },
      (error)=>{
        console.error(error);
        this.snackBar.open("Sign up failed. Please try again.", "Close", {duration:5000, panelClass: "error-snackbar"});
      }

    )

  }
}
