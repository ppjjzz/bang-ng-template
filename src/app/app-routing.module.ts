import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadRoutersService } from '@core/router/preload-routers.service';
import { AuthGuard } from '@core/router/auth.guard';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivateChild: [AuthGuard],
        loadChildren: './view/dashboard/dashboard.module#DashboardModule'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadRoutersService })],
    exports: [RouterModule],
    providers: [PreloadRoutersService, AuthGuard]
})
export class AppRoutingModule { }
