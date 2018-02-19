import {
    NgModule
} from '@angular/core';
import {
    Routes,
    RouterModule,
    Route
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { PreloadRoutersService } from '@core/router/preload-routers.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'routes',
        pathMatch: 'full'
    }
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadRoutersService }) // 路由模式默认为哈希,启动预加载
    ],
    providers: [PreloadRoutersService],
    exports: [RouterModule]
})
export class AppRoutingModule { }


