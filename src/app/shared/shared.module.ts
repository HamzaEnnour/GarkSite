import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ErrorComponent } from '../views/error/error.component';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ResolutionDirective } from './directives/resolution.directive';
@NgModule({
  declarations: [ ResolutionDirective],
  imports: [
    PerfectScrollbarModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    PerfectScrollbarModule,
    RouterModule,
    CommonModule
  ]
})
export class SharedModule { }
