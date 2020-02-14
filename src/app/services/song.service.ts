;import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { Song } from '../model/song';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';
import { Playlist } from '../model/playlist';
import { PlayerComponent } from '../player/player.component';
import { Stage } from '../model/stage';


@Injectable({
  providedIn: 'root'
})
export class SongService {

  private songsUrl = environment.apiUrl + 'songs';  // URL to web api
  private playlistsUrl = environment.apiUrl + 'playlists';
  private stageUrl = environment.apiUrl + 'stages'
  private activePlaylist: Playlist;
  private activeSong: Song;
  @Output()
  private addedSong = new EventEmitter<Song>();
  private selectedSong = new EventEmitter<Song>(); 
  private deletedStage = new EventEmitter<Stage>();


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, 
    private messageService: MessageService,
    ) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.songsUrl)
      .pipe(
        tap(_ => this.log('fetched songs')),
        catchError(this.handleError<Song[]>('getSongs', []))
      );
  }

  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.songsUrl}/${id}`)
  }

  getDefaultPlaylist(): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.playlistsUrl}/default`)
  }

  getSongsFromPlaylist(id: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.playlistsUrl}/${id}/songs`)
  }

  postSong(song: Song): Observable<Song> {
    const id = song.fileId;
    const url = `${this.songsUrl}/${id}`;

    return this.http.post<Song>(url, song, this.httpOptions).pipe(
      tap(_ => this.log(`post song id=${id}`)),
      catchError(this.handleError<Song>('postSong'))
    );
  }

  updateSong(song: Song): Observable<Song> {
    const id = typeof song === 'number' ? song : song.id;
    const url = `${this.songsUrl}/${id}`;
    
    return this.http.put<Song>(url, song, this.httpOptions).pipe(
      tap(_ => this.log(`update song id=${id}`)),
      catchError(this.handleError<Song>('updateSong'))
    );
  }

  deleteSong(song: Song): Observable<Song> {
    const id = typeof song === 'number' ? song : song.id;
    const url = `${this.songsUrl}/${id}`;

    return this.http.delete<Song>(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete song id=${id}`)),
      catchError(this.handleError<Song>('deleteSong'))
    );
  }

  setActivePlayList(playlist: Playlist) {
    this.activePlaylist = playlist;
    console.log("Playlist: " + this.activePlaylist.id)
  }

  setActiveSong(song: Song) {
    console.log(`Active song: ${song.id}`)
    this.activeSong = song;
    this.songSelected().emit(song);
  }

  songSelected(): EventEmitter<Song> {
    return this.selectedSong;
  }

  songAdded(): EventEmitter<Song> {
    return this.addedSong;
  }

  stageDeleted(): EventEmitter<Stage> {
    return this.deletedStage;
  }

  addSongToPlaylist(song: Song): Observable<Playlist> {
    const destUrl = `${this.playlistsUrl}/${this.activePlaylist.id}/${song.id}`
    console.log(`Adding Song ${song.id} to playlist at url: ${destUrl}`)
    return this.http.put<Playlist>(destUrl, null, this.httpOptions).pipe(
      tap(_ => {this.log(`add song id=${song.id}`);
        this.songAdded().emit(song);
    }),
      catchError(this.handleError<Playlist>('addSong')))
  }

  getStages(songId: number): Observable<Stage[]> {
    const destUrl = `${this.stageUrl}/song/${songId}`;
    return this.http.get<Stage[]>(destUrl, this.httpOptions)
  }

  getActiveSong(): Song {
    return this.activeSong;
  }

  getActiveSongStages(): Observable<Stage[]> {
    return this.getStages(this.activeSong.id);
  }

  deleteStage(stage: Stage): Observable<Stage> {
    return this.http.delete<Stage>(`${this.stageUrl}/${stage.id}`, this.httpOptions).pipe(
      tap(_ => {this.log(`add song id=${stage.id}`);
        this.stageDeleted().emit(stage);
    }),
      catchError(this.handleError<Stage>('addSong')));
  }
  
  private log(message: string) {
    this.messageService.add(`SongService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
  
}
