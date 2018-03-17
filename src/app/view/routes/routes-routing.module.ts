import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesComponent } from './routes.component';
import { PreloadRoutersService } from '@core/router/preload-routers.service';
const routes: Routes = [
  {
      path: '',
      component: RoutesComponent,
      children: [
        {
          path: 'dashboard',
          loadChildren: './dashboard/dashboard.module#DashboardModule'
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'dashboard'
        }
      ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadRoutersService })], // 路由模式默认为哈希,启动预加载
  providers: [PreloadRoutersService],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
