import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SongListComponent } from './song-list/song-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { MinutesSecondsPipe } from './minutes-seconds.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SongListComponent,
    MinutesSecondsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
