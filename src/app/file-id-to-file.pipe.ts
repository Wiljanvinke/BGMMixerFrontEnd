import { Pipe, PipeTransform, Inject } from '@angular/core';
import { FileService } from './file.service';
import { File } from './file';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'fileIdToFile',
  pure: false
})
export class FileIdToFilePipe implements PipeTransform {

  file: File = null;
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