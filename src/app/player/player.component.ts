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
    id: 100,
    name: 'Test',
    duration: 180,
    file: 0,
    stages: [300,301],
  };

  constructor() { }

  ngOnInit() {
  }

}
