import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { MyFile } from './file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url = 'http://localhost:8082/'
  private filesUrl = this.url + 'files';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getFile(id: number): Observable<MyFile> {
    return this.http.get<MyFile>(`${this.filesUrl}/${id}`);
  }
/* 
  uploadFile(fileToUpload: File): Observable<boolean> {
    const endpoint = this.url + 'uploadFile';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, this.httpOptions).pipe(
    map(() => { return true; }),
    catchError(this.handleError<boolean>('uploadFile')))    
  } */

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