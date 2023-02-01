import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, public userService:UserService, private snackbar:MatSnackBar, private router:Router) {}

  ngOnInit(): void {

  }

  loginForm = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]]
  });

  login(){
    this.userService.getUser(this.loginForm.value.email).then((res:any)=>{
      //console.log(res);
      if(res.length == 0){
        this.snackbar.open('Account does not exist', 'ok');
      } else {
        if(res[0].password === this.loginForm.value.password){
          this.userService.user = res[0];
          localStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigate(['/posts']);
        } else {
          this.snackbar.open('Incorrect Password', 'ok');
          //console.log("incorrect password");
        }
      }
    }).catch((err)=>{

    });
  }

}
