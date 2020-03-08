import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: 'topGames', component: ContentComponent },
  { path: '', redirectTo: 'topGames', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
