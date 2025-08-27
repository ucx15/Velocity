import mongoose from "mongoose";
import { SongData } from "../utils/types.js";


const SongSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, },
		artist: { type: String, required: true, },
		album: { type: String, required: false, },
		duration: { type: Number, required: true, },
		genre: { type: [String], required: false, },
		filePath: { type: String, required: true, },
	},
	{ timestamps: true }
);


const Song = mongoose.model("Song", SongSchema);


// useful methods (Services) for the Song model
const add = async (song: SongData) => {
	if (!song.title || !song.artist || !song.filePath || song.duration <= 0) {
		throw new Error("Invalid song data");
	}

	const newSong = new Song(song);
	await newSong.save();
};

const get = async (SongID: string) => {
	return await Song.findOne({ _id: SongID }, { filePath: 0 });
};

const getFull = async (SongID: string) => {
	return await Song.findOne({ _id: SongID });
};

const getAll = async () => {
	return await Song.find({});
};

const getTitles = async () => {
	return await Song.find(
		{}, { _id: 1, title: 1, artist: 1, duration: 1 }
	)
		.sort({ title: 1 });
};



export default { Song, add, getAll, getTitles, get, getFull };
