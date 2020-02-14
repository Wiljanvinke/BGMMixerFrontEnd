import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SongService } from '../services/song.service';
import { Stage } from '../model/stage';
import { Song } from '../model/song';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit, OnChanges {

  private stages: Stage[];
  @Input() private currentFile;
  private activeSong: Song;

  constructor(private songService: SongService) { }

  ngOnInit() {
/*     this.songService.songSelected().subscribe(song => {
      console.log("New Song Selected")
      this.activeSong = song;
      this.songService.getStages(this.currentFile.song.id)
        .subscribe(stages => this.stages = stages)
      }
    );
    this.songService.songSelected().subscribe(song => this.activeSong = song);
    this.songService.stageDeleted().subscribe(() => this.getStages(this.activeSong.id));
 */  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.currentFile.currentValue.song != null){
      this.songService.getStages(changes.currentFile.currentValue.song.id)
      .subscribe(stages => this.stages = stages)
    }
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
