import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongListComponent } from './song-list/song-list.component';
import { SongDetailsComponent } from './song-details/song-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/songlist', pathMatch: 'full' },
  { path: 'songlist', component: SongListComponent },
  { path: 'song/:id', component: SongDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
