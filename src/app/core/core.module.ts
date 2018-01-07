import { NgModule, APP_INITIALIZER, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { CORE_SERVICES } from './service/index';
import { CoreService } from './core.service';

import { ApiConfig } from './service/config.api';

export function configFactory(config: ApiConfig ) {
  return function () {
      config.load();
  };
}

const providers = [
  CoreService,
  CORE_SERVICES,
  { provide: APP_INITIALIZER, useFactory: configFactory, deps: [ApiConfig], multi: true }
];


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
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
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: CoreModule,
          providers
      };
  }
 }
