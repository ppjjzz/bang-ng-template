import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ShareModule } from '@share/share.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
