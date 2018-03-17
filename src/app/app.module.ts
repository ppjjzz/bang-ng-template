import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { RoutesModule } from './view/routes/routes.module';
import { AppComponent } from './app.component';
import { environment } from '@env/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RoutesModule,
    /* 默认打包环境为prod时注册ServiceWorker,如不需要可以注释掉,相关配置可以参考英文官网 */
    environment.env === 'prod' ? ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }) : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
