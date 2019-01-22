/*
共享模块，引入各个routes模块的需要的模块，统一exports
如引入第三方ui模块，必须在模块中exports
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ExampleComponent } from './component/layout/example/example.component';
import { NgShowDirective } from '@share/directives/ngShow';
import { MappingPipe } from '@share/pipe/mapping.pipe';
import { DictPipe } from '@share/pipe/dict.pipe';
import { ModifyPipe } from '@share/pipe/modify.pipe';

/* 注册共享的组件,指令和管道 */
const COMPONENTS = [
  ExampleComponent
];
const DIRECTIVES = [
  NgShowDirective
];
const PIPES = [
  MappingPipe,
  DictPipe,
  ModifyPipe
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
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



