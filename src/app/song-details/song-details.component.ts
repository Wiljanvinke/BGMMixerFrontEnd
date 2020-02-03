import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Song } from '../song';
import { SongService } from '../song.service';
import { FileService } from '../file.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

  @Input() song: Song;
  fileToUpload: File = null;
  //public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(
    private songService: SongService,
    private fileService: FileService,
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  /* uploadFileToActivity() {
    this.fileService.uploadFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  } */

  save(): void {
    this.songService.updateSong(this.song).subscribe(() => this.goBack());
  }
  
  goBack(): void {
    this.location.back();
  }

}
