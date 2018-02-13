import {
    NgModule
} from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { CommonModule } from '@angular/common';





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
        RouterModule.forRoot(routes, { useHash: true }) // 路由模式默认为哈希
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }


