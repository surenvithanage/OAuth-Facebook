import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public myForm: FormGroup;
  public user: SocialUser;
  public isSignedin: boolean = false;
  public metaData: any;
  public permissionData: any;
  
  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      console.log(this.user);
      this.metaInfo(user);
      this.permission(user);
    });
  }

  metaInfo(user: any) {
    this.appService.loadMetaInfo(user.id, user.authToken).subscribe(
      data => {
        console.log(data);
        this.metaData = data;
      }
    )
  }

  permission(user:any) {
    this.appService.loadPermission(user.id, user.authToken).subscribe(
      data => {
        this.permissionData = data;
      }
    )
  }

  facebookSignin(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
