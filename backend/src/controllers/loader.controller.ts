import { parseFile } from 'music-metadata';

import env from '../utils/env.js';
import { findMusicFiles } from '../utils/utils.js';
import { SongData } from '../utils/types.js';

import Song from '../models/song.model.js';

// TODO: Add logic to handle cover art
const loadInitialData = async () => {

	const musicFiles = findMusicFiles(env.MUSIC_DIR);
	if (musicFiles.length === 0) {
		console.warn(`No music files found in ${env.MUSIC_DIR}`);
		return;
	}

	console.log(`Found ${musicFiles.length} music files in ${env.MUSIC_DIR}`);

	for (const file of musicFiles) {
		const metadata = await parseFile(file);
		if (
			!metadata
		) {
			console.warn(`No metadata found for file: ${file}`);
		}

		const song: SongData = {
			title: metadata.common.title || "unknown",
			artist: metadata.common.artist || "unknown",
			duration: metadata.format.duration || 0,
			filePath: file,

			album: metadata.common.album,
			genre: metadata.common.genre,
		};

		// Add song to the database
		Song.add(song);
	}
};


export default loadInitialData;
