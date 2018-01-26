/*
共享模块，引入各个features模块的需要的模块，统一exports
如引入第三方ui模块，必须在模块中exports
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    FormsModule, ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  declarations: []
})
export class ShareModule {
}



