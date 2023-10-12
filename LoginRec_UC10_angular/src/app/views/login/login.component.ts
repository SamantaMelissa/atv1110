import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  constructor(private loginService: LoginService, private router: Router){}

  // ngOnInit(): void{

  // }

  userModel = new User()

  onSubmit() {
    // console.log(this.userModel)
    // this.loginService.login(this.userModel).subscribe((response)=>{
    //   console.log("Deu super bommm!")
    // },(respError) => {
    //   console.log("Deu super ruim")
    // })
    console.log(this.userModel)
    this.loginService.login(this.userModel).subscribe((response) => {
      // Se ok:
      console.log("deu bommmm")
      this.router.navigateByUrl("/")
    },(respErro) => {
      // Se erro:
      console.log("deu ruimmmmmmmm")
    })

  }

  
}
