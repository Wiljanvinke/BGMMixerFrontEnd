import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SongListComponent } from './song-list/song-list.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { MinutesSecondsPipe } from './minutes-seconds.pipe';
import { SongDetailsComponent } from './song-details/song-details.component';
import { FileIdToFilePipe } from './file-id-to-file.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SongListComponent,
    MinutesSecondsPipe,
    SongDetailsComponent,
    FileIdToFilePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
