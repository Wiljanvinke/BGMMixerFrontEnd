import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { File } from './file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private filesUrl = 'http://localhost:8082/files';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getFile(id: number): Observable<File> {
    return this.http.get<File>(`${this.filesUrl}/${id}`);
  }}
