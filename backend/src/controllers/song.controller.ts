import { Request, Response } from 'express';
import Song from '../models/song.model.js';


const getAllSongs = async (req: Request, res: Response) => {
	try {
		// const songs = await Song.getAll();
		const songs = await Song.getTitles();
		res.status(200).json(songs);
	}
	catch (error) {
		console.error("Error fetching songs:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export { getAllSongs };