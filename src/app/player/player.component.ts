import { Component, OnInit, Input } from '@angular/core';
import { AudioService } from "../services/audio.service";
import { SongService } from "../services/song.service";
import { StreamState } from "../interfaces/stream-state";
import { environment } from '../../environments/environment';
import { Song } from '../model/song';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() loop: boolean;

  songs: Array<any> = [];
  state: StreamState;
  currentFile: any = {};
  private url: String = environment.apiUrl;

  constructor(
    public audioService: AudioService,
    public songService: SongService
  ) {
    // get media files
    songService.getSongs().subscribe(songs => {
      this.songs = songs;
    });

    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.songs.length - 1;
  }

  playStream(url: String) {
    this.audioService.playStream(url).subscribe((events: Event) => {
      console.log(events);
      switch (events.type){
        case "ended": 
          this.onSongEnded();
          break;
      }
      // listening for fun here
    });
  }

  openFile(song: Song, index) {
    this.currentFile = { index, song };
    this.audioService.stop();
    this.playStream("" + this.url + "downloadFile/" + song.fileId);
  }
  
  play() {
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const song = this.songs[index];
    this.openFile(song, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const song = this.songs[index];
    this.openFile(song, index);
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  onSongEnded(){
    if(!this.isLastPlaying()){
      this.next();
    }
  }
}
