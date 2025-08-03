import mongoose from "mongoose";
import {SongData} from "../utils/types.js";


const SongSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: true,
	},
	album: {
		type: String,
		required: false,
	},
	duration: {
		type: Number, // Duration in seconds
		required: true,
	},
	genre: {
		type: [String],
		required: false,
	},
	filePath: {
		type: String,
		required: true,
	},
}, { timestamps: true });


const Song = mongoose.model("Song", SongSchema);



const add = async (song : SongData) => {
	if (!song.title || !song.artist || !song.filePath || song.duration <= 0) {
		throw new Error("Invalid song data");
	}

	const newSong = new Song(song);
	await newSong.save();
};

export default { Song, add };