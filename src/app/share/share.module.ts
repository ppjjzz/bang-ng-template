/*
共享模块，引入各个routes模块的需要的模块，统一exports
如引入第三方ui模块，必须在模块中exports
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgShowDirective } from '@share/directives/ngShow';

/* 注册共享的组件,指令和管道 */
const COMPONENTS = [];
const DIRECTIVES = [
  NgShowDirective
];
const PIPES = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ]
})
export class ShareModule {
}



