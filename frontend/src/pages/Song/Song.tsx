import React from 'react'

import { useParams } from 'react-router-dom';
// import { useParams, useNavigate } from 'react-router-dom';

// Types
import type {SongListItem} from "../../Types/SongListItem"

// Components
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer"
import SongInfo from "../../components/SongInfo/SongInfo"

// Styles

// Utils
import BACKEND_URI from "../../config"


const Song = () => {
	// const navigate  = useNavigate();
	const { id } = useParams<{ id: string }>() as { id: string };
	const [SongData, setSongData] = React.useState<SongListItem | undefined>();

	React.useEffect(() => {
		if (!id) {
			console.error("No song ID provided in URL");
			return;
		}

		console.log("Song ID:", id);
		// Fetch song details here if needed

		fetch(`${BACKEND_URI}/song/${id}`)
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			setSongData(data);
		})

	}, [id]);

	if (id && SongData) {
		const placeholdURI = `https://placehold.co/100x100?text=${SongData.artist}+-+${SongData.title}`;

		return (
			<div className="songPage">
				<SongInfo
					title={SongData.title}
					artist={SongData.artist}
					cover={placeholdURI}
				/>

				<AudioPlayer
					songID={id}
				/>
			</div>
		)
	}
}

export default Song
