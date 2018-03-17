import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './routes.component';
import { ShareModule } from '@share/share.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    RoutesRoutingModule
  ],
  declarations: [RoutesComponent],
  exports: [RoutesComponent]
})
export class RoutesModule { }
