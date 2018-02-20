import { NgModule, APP_INITIALIZER, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NET_SERVICES } from './net/index';
import { CoreService } from './core.service';

import { ApiConfig } from './net/api.config';

export function configFactory(config: ApiConfig) {
  return () => config.load();
}

const providers = [
  CoreService,
  NET_SERVICES,
  { provide: APP_INITIALIZER, useFactory: configFactory, deps: [ApiConfig], multi: true }
];


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        '核心模块CoreModule已经引入，只允许在根模块内导入核心模块');
    }
  }
}
