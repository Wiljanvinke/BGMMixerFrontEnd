import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import { Stage } from '../model/stage';
import { Song } from '../model/song';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {

  private stages: Stage[];
  private activeSong: Song;

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songService.songSelected().subscribe(song => {
      console.log("New Song Selected")
      this.activeSong = song;
      this.songService.getActiveSongStages()
        .subscribe(stages => this.stages = stages)
      }
    );

    this.songService.stageDeleted().subscribe(() => this.getStages(this.activeSong.id));
  }

  getStages(songId: number){
    this.songService.getStages(songId)
      .subscribe(stages => this.stages = stages);
  }

  deleteStage(stage: Stage) {
    this.stages.filter(s => s !== stage);
    this.songService.deleteStage(stage).subscribe();
  }

}
