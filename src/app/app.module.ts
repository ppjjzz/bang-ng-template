import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    /* 默认打包环境为prod时注册ServiceWorker,如不需要可以注释掉,相关配置可以参考英文官网 */
    environment.env === 'prod' ? ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }) : []
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
