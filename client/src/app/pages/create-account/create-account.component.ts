import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(private fb:FormBuilder, public userService:UserService, private router:Router, private snackbar:MatSnackBar) {}

  ngOnInit(): void {

  }

  createAccountForm = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    username:['',[Validators.required, Validators.maxLength(10)]],
    password:['',[Validators.required, Validators.minLength(6)]]
  });

  create(){
    this.userService.createNewUser(this.createAccountForm.value).then((res)=>{
      this.userService.user = res;
      this.router.navigate(['/posts'])
    }).catch((err)=>{
      this.snackbar.open("Error creating user", "Ok");
    });
  }

}
