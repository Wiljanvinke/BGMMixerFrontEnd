import { Pipe, PipeTransform, Inject } from '@angular/core';
import { FileService } from '../services/file.service';
import { MyFile } from '../model/file';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'fileIdToFile',
  pure: false
})
export class FileIdToFilePipe implements PipeTransform {

  file: MyFile = null;
  fileString: String;
  cachedId: number;

  constructor(@Inject(FileService) private fileService: FileService){}

  transform(id: number): String {
    if(this.cachedId !== id){
      this.file = null;
      this.cachedId = id;
      this.fileService.getFile(id).subscribe(file => {
        this.file = file;
        let fileString = file.fileName;
        return this.fileString = fileString;
      });  
    }
    
    return this.fileString;

  }

}