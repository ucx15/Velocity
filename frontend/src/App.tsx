// import React from 'react'

import AudioPlayer from "./AudioPlayer"


const App = () => {
	return (
		<div>
			<h1 style={{ fontSize: '3.6rem' }}>Velocity</h1>

			<AudioPlayer
				filename="WhiteNoise.mp3"
				title="White Noise"
				artist="Lo-Fi Collective"
				cover="https://example.com/cover.jpg"
			/>

		</div>
	)
}

export default App
