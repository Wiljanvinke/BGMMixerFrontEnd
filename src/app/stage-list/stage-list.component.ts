import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import { Stage } from '../model/stage';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {

  private stages: Stage[];

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songService.songSelected().subscribe(() => {
      console.log("New Song Selected")
      this.songService.getActiveSongStages()
        .subscribe(stages => this.stages = stages
      )
        }
    );
  }

  getStages(songId: number){
    this.songService.getStages(songId)
      .subscribe(stages => this.stages = stages);
  }

}
