import React from 'react'


import { useEffect, useState } from "react"
import styles from "./home.module.css"


type SongListItem = {
	title: string;
	artist: string;
	duration : number;

}


const Home = () => {

	const [songsList, setSongsList] = useState<[SongListItem]>();

	useEffect(() => {
		fetch("http://localhost:5000/api/songs")
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				setSongsList(data);
			});
	}, [])

	return (
		<div className={styles.Home}>

			{songsList && songsList.map((song, index) => (
				<div key={index}>
					<h2>{song.title}</h2>
					<p >{song.artist}</p>
					<p >{song.duration}s</p>
				</div>
			))}

		</div>
	)
}

export default Home
