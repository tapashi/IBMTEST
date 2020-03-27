import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspirationComponent } from './inspiration.component';
import { InspirationRoutingModule } from './inspiration-routing.module';

@NgModule({
    declarations: [
      InspirationComponent
    ],
    imports: [
      CommonModule,
      InspirationRoutingModule
    ]
})
export class InspirationModule {}
