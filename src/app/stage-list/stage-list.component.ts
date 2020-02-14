import { Component, OnInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
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
  @Output() private selectedStage: Stage;
  @Input() private currentFile;

  constructor(private songService: SongService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.currentFile.currentValue.song != null){
      this.songService.getStages(changes.currentFile.currentValue.song.id)
      .subscribe(stages => this.stages = stages)
    }
  }

  getStages(songId: number){
    this.songService.getStages(this.currentFile.song.id)
      .subscribe(stages => this.stages = stages);
  }

  deleteStage(stage: Stage) {
    this.stages.filter(s => s !== stage);
    this.songService.deleteStage(stage).subscribe();
  }

  newStage(){

  }

  getSelectedStage(): Stage {
    return this.selectedStage;
  }

  selectStage(stage: Stage): void {
    this.selectedStage = stage;
    console.log(this.selectedStage.name);
  }

}
