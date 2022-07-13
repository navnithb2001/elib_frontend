import { User } from './../Data/User';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { Roles } from '../Data/Roles';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css'],
  providers: [ApiServiceService]
})
export class LoginViewComponent implements OnInit {

  loginForm = new FormGroup({});
  registerForm = new FormGroup({});
  public user1: User = {
    userId: 0, username: "", password: "", dob: new Date('0000-00-00'), address: '', role: Roles.CLIENT, order: [],
    name: '',
    fine: 0
  };
  constructor(private router:Router,private route: ActivatedRoute,private apiserv: ApiServiceService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("",[
        Validators.required
      ]),
      password: new FormControl("",[
        Validators.required,
        Validators.minLength(8)
      ])
  });

  this.registerForm = new FormGroup({
    username: new FormControl("",[
      Validators.required
    ]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(8)
    ]),
    name: new FormControl("",[
      Validators.required,
      Validators.maxLength(32)
    ]),
    dob: new FormControl(new Date('0000-00-00'),[
      Validators.required
    ]),
    address: new FormControl("",[
      Validators.required,
      Validators.maxLength(50)
    ]),
    role: new FormControl(Roles.CLIENT)
    });


  }

  onLogin(){
    this.apiserv.login(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value)
                      .subscribe((user: User)=>{
                        console.warn("login success");
                        this.loginForm.reset();
                        console.warn(user.userId.toString());

                        this.router.navigate(["../api",user.userId],{relativeTo: this.route});
                      });
  }

  onRegister(){
    this.user1 = this.registerForm?.value;
    this.apiserv.register(this.user1)
                      .subscribe((success)=>{
                        console.warn("register success");
                        this.registerForm.reset();
                        this.router.navigate(["../"],{relativeTo: this.route});
                      });
  }

}
