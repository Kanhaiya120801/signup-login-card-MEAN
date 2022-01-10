import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [{ path: '', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }, 
{ path: 'dashboard', canActivate: [AuthGuardService],loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
{ path: 'shared', canActivate: [AuthGuardService],loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
{ path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
