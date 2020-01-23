import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songs: Song[];

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs().subscribe(songs => this.songs = songs);
  }

  deleteSong(song: Song): void{
    this.songs = this.songs.filter(s => s !== song);
    this.songService.deleteSong(song).subscribe();
  }

}
