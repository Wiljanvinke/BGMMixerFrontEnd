import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  files: Array<any> = [
    { name: "First Song", artist: "Inder" },
    { name: "Second Song", artist: "You" }
  ];
  state;
  currentFile: any = {};

  constructor() { }

  ngOnInit() {
  }

  isFirstPlaying() {
    return false;
  }
  isLastPlaying() {
    return true;
  }
}
