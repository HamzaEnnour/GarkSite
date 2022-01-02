import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from "ngx-ui-loader";
import { HomePageComponent } from './home-page/home-page.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { CommonModule } from '@angular/common';
import { FooterAppComponent } from './layout/footer-app/footer-app.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './shared/services/authentication.service'
import { QuicklinkModule , QuicklinkStrategy } from 'ngx-quicklink';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#21f56d',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 90,
  fgsType: SPINNER.threeBounce,
  pbDirection: PB_DIRECTION.leftToRight, 
  logoUrl: "/assets/imgs/site/GARK-LOGO@2x.png",
  logoSize:120,
  logoPosition: POSITION.centerCenter,
  pbColor:'#21f56d'
};

@NgModule({
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ScrollToModule.forRoot(),
    QuicklinkModule,
  ],
  declarations: [	
    AppComponent, 
    HomePageComponent, 
    FooterAppComponent, 
    HomeLayoutComponent,
   ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
