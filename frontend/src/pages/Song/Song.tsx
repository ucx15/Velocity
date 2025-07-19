// import React from 'react'

// Components
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer"
import SongInfo from "../../components/SongInfo/SongInfo"

// Styles


const Song = () => {
	return (
		<div className="songPage">
			<SongInfo
				title="Skyfall"
				artist="Adele"
				cover="https://placehold.co/100x100?text=Adele+-+Skyfall"
			/>

			<AudioPlayer
				songID="adele-skyfall"
			/>
		</div>
	)
}

export default Song
