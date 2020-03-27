import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { InspirationModule } from './pages/inspiration/inspiration.module';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { EpisodesModule } from './pages/episodes/episodes.module';
import { GalleryModule } from './pages/gallery/gallery.module';
import { DropDownDirective } from './directive/dropdown.directive';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppLayoutComponent,
    DropDownDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    InspirationModule,
    EpisodesModule,
    GalleryModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
