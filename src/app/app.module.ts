import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from '@app/app-routing.module';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
