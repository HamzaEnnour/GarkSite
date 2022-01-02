
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { QuicklinkStrategy } from 'ngx-quicklink'

const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent, children: [
      { path: '', component: HomePageComponent }
    ]
  },
  { path: 'views', loadChildren: () => import('./views/views.module').then(m => m.ViewsModule) },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
