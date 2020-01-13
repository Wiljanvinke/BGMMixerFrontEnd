import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  song: Song = {
    id: 0,
    name: 'Test',
    length: 180
  };

  constructor() { }

  ngOnInit() {
  }

}
