import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Song } from '../model/song';
import { SongService } from '../services/song.service';
import { FileService } from '../services/file.service';
import { environment } from './../../environments/environment';
import { MyFile } from '../model/file';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

  @Input() song: Song;

  private uploader = this.fileService.uploader;

  constructor(
    private songService: SongService,
    private fileService: FileService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getSong();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }; 
  }

  getSong(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.songService.getSong(id)
    .subscribe(song => this.song = song);
  }

  uploadFile(): void {
    if (this.uploader.getNotUploadedItems().length == 1){
      this.uploader.uploadAll();
      let response: MyFile;
      this.uploader.response.subscribe(res => {
        response = JSON.parse(res);
        this.song.fileId = response.id;
      });
    } else {
      this.uploader.clearQueue();
      alert("Please pick only one file");
    }
    
  }

  save(): void {
    this.songService.updateSong(this.song).subscribe(() => this.goBack());
  }
  
  goBack(): void {
    this.location.back();
  }

}
