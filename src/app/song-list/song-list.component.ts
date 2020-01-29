import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songs: Song[];
  //dataSource = new MatTableDataSource(this.songs);
  displayedColumns: string[] = ['song', 'description', 'length', 'edit'];


  constructor(private songService: SongService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs().subscribe(songs => this.songs = songs);
  }

  editSong(id: number): void {
  }

  deleteSong(song: Song): void {
    this.songs = this.songs.filter(s => s !== song);
    this.songService.deleteSong(song).subscribe();
  }

  getDuration(song: Song): String {
    for (let i = 0; i < this.songs.length; i++) {
      if (this.songs[i] == song) {
        return (this.songs[i].duration / 1000).toFixed(0);
      }
      
    }
    return "Not Valid";
  }


/*   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } */

}
