import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: ':lang',
        loadChildren: () => import('./pages/inspiration/inspiration.module').then(m => m.InspirationModule)
      },
      {
        path: ':lang/episodes',
        loadChildren: () => import('./pages/episodes/episodes.module').then(m => m.EpisodesModule)
      },
      {
        path: ':lang/gallery',
        loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule)
      },
      {
        path: '',  redirectTo: 'en-us', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


