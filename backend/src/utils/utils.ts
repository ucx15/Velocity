import path from 'path';
import fs from 'fs';


function listMusicFiles(dir : string) {
  return fs.readdirSync(dir).filter(file => file.endsWith('.mp3') || file.endsWith('.wav') || file.endsWith('.flac'));
  // return fs.readdirSync(dir);
}

function findMusicFiles(dir : string) {
  const files = listMusicFiles(dir);
  return files.map(file => ({
	name: file,
	path: `${dir}/${file}`
  }));
}


export {listMusicFiles, findMusicFiles };