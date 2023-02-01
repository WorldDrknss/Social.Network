import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, public userService:UserService, private snackbar:MatSnackBar) {}

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
          //console.log("matched");
        } else {
          this.snackbar.open('Incorrect Password', 'ok');
          //console.log("incorrect password");
        }
      }
    }).catch((err)=>{

    });
  }

}
