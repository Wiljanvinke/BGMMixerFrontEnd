import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

  @Input() song: Song;

  constructor(
    private songService: SongService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getSong();
  }

  getSong(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.songService.getSong(id)
    .subscribe(song => this.song = song);
  }

}
