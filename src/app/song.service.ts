import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Song } from './song';
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private songsUrl = 'http://localhost:8082/songs';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

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

  postSong(file: File): void {

  }

  updateSong(song: Song): Observable<any> {
    const id = typeof song === 'number' ? song : song.id;
    const url = `${this.songsUrl}/${id}`;
    
    return this.http.put(url, song, this.httpOptions).pipe(
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
