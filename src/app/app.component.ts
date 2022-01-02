import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from './shared/services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private _auth: AuthenticationService,
    private router : Router,
    private loaderService : NgxUiLoaderService
    ) {}

  ngOnInit() {
    if(this._auth.isAuthenticated){
      this._auth.findByIduser(this._auth.Payload["signiature"]).subscribe(
        (res) => {     
        },
        (err) => {
          if(err["error"]["status"]=="TOKEN UNVALID")     
          this._auth.signOut()
          window.location.href= "/"
        }
      )
      
    }
    else
    {
      this.router.navigateByUrl('/');
    }

    this.router.events.subscribe(val => {
      if(val instanceof NavigationStart){
        this.loaderService.start();
      }
      if(val instanceof NavigationEnd){
        this.loaderService.stop();
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.addClass(document.body, 'show');
    }, 1000);
    setTimeout(() => {
      this.renderer.addClass(document.body, 'default-transition');
    }, 1500);
  }
}
