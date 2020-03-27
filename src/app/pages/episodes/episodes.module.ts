import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesComponent } from './episodes.component';
import { EpisodesRoutingModule } from './episodes-routing.module';

@NgModule({
    declarations: [
      EpisodesComponent
    ],
    imports: [
      CommonModule,
      EpisodesRoutingModule
    ]
})
export class EpisodesModule {}
