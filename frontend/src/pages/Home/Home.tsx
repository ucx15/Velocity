import React from 'react'


// Components
import SongsList from "./SongsList"

// Styles
import styles from "./home.module.css"

// Types
import type {SongListItem} from "../../Types/SongListItem"

// Utils
import BACKEND_URI from '../../config'


const Home = () => {

	const [songs, setSongs] = React.useState<[SongListItem]>();

	React.useEffect(() => {
		fetch(`${BACKEND_URI}/songs`)
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				setSongs(data);
			});
	}, [])

	return (
		<div className={styles.Home}>
			<SongsList data={songs}/>
		</div>
	)
}

export default Home
