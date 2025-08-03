import fs from 'fs';

function findMusicFiles(dir: string) {
  const files = fs.readdirSync(dir)
    .filter(file =>
      file.endsWith('.flac') ||
      file.endsWith('.aiff') ||
      file.endsWith('.mp3')  ||
      file.endsWith('.ogg')  ||
      file.endsWith('.aac')  ||
      file.endsWith('.m4a')  ||
      file.endsWith('.wav')
    );

  return files.map(file => (`${dir}/${file}`));
}


export { findMusicFiles };