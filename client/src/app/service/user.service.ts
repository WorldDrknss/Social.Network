import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public createNewUser(dataObj:any){
    return new Promise((resolve, reject)=>{
      this.http.post('http://localhost:3000/users', dataObj).subscribe({
        next: (res: any) => { resolve(res) },
        error: (e: any) => { reject(e) },
        complete: () => { console.log('Complete') }
      });
    });
  }

  public getUser(email:any){
    return new Promise((resolve, reject)=>{
      this.http.get('http://localhost:3000/users?email=' + email).subscribe({
        next: (res: any) => { resolve(res) },
        error: (e: any) => { reject(e) },
        complete: () => { console.log('Complete') }
      });
    });
  }
}
