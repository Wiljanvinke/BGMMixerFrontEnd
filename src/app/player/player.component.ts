import { Component, OnInit, Input, OnChanges, SimpleChange, ChangeDetectorRef, Output } from '@angular/core';
import { AudioService } from "../services/audio.service";
import { SongService } from "../services/song.service";
import { StreamState } from "../interfaces/stream-state";
import { environment } from '../../environments/environment';
import { Song } from '../model/song';
import { TestBed } from '@angular/core/testing';
import { Playlist } from '../model/playlist';
import { Observable, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { Stage } from '../model/stage';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() loop: boolean;
  playlist: Playlist;
  songlist$: Observable<Song[]>;
  songs: Array<Song> = [];
  state: StreamState;
  currentFile: any = {};
  private url: String = environment.apiUrl;

  constructor(
    public audioService: AudioService,
    public songService: SongService,
  ) {
    
    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {
    // get media files
    this.songService.getDefaultPlaylist().subscribe(playlist => {
      this.playlist = playlist;
      this.songService.setActivePlayList(playlist);
      this.songlist$ = this.songService.getSongsFromPlaylist(this.playlist.id);
      this.songlist$.subscribe(songs => {
        this.songs = songs;
      });
    });

    this.songService.songAdded().subscribe(song => this.addSong(song));

  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.songs.length - 1;
  }

  playStream(url: String) {
    this.audioService.playStream(url).subscribe((events: Event) => {
      //console.log(events);
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
    this.songService.setActiveSong(song);
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
    if(this.state.playing){
      this.play();
    }
  }

  previous() {
    const index = this.currentFile.index - 1;
    const song = this.songs[index];
    this.openFile(song, index);
    if(this.state.playing){
      this.play();
    }
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  onSongEnded(){
    if(!this.isLastPlaying()){
      this.next();
    }
  }

  addSong(song: Song){
    this.songs.push(song);
  }

  public getPlaylist(): Playlist {
    return this.playlist;
  }

  validStartTime(currentTime: number, stage: Stage): boolean {
    console.log(`validStartTime started`)
    return !(stage != null &&
      currentTime < stage.endTime)
  }

  validEndTime(currentTime: number, stage: Stage): boolean {
    console.log(`validStartTime started`)
    return !(stage != null &&
      currentTime > stage.startTime)
  }
}
