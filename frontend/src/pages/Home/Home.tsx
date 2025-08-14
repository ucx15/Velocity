import React from 'react'


// Components
import SongsList from "./SongsList"

import styles from "./home.module.css"

import type {SongListItem} from "../../Types/SongListItem"

const Home = () => {

	const [songs, setSongs] = React.useState<[SongListItem]>();

	React.useEffect(() => {
		fetch("http://localhost:5000/api/songs")
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
