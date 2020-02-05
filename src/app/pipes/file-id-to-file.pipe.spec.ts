import { FileIdToFilePipe } from './file-id-to-file.pipe';

describe('FileIdToFilePipe', () => {
  it('create an instance', () => {
    let id;
    const pipe = new FileIdToFilePipe(id);
    expect(pipe).toBeTruthy();
  });
});
