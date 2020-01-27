import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  songs: Song[];
  //dataSource = new MatTableDataSource(this.songs);
  displayedColumns: string[] = ['song', 'description', 'length'];


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


/*   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } */

}
