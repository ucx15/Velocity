// import React from 'react'

import { useNavigate } from 'react-router-dom';

// Types
import type { SongListItem } from '../../Types/SongListItem';

// Styles
import styles from "./SongCard.module.css"


const SongCard = ({ _id, title, artist, duration }: SongListItem) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/song/${_id}`);
	}

	return (
		<div className={styles.SongCard} onClick={handleClick}>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.artist}>{artist}</p>
			<p className={styles.duration}>{`${Math.floor(duration / 60)}:${String(Math.round(duration % 60)).padStart(2, '0')}`}</p>
		</div>
	)
}

export default SongCard
