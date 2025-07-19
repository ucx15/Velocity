// import React from 'react'

// Props for the SongInfo component
interface SongInfoProps {
	title: string;
	artist: string;
	cover?: string;
}

// Styles
import styles from './SongInfo.module.css';


const SongInfo = (props : SongInfoProps) => {
	const { title, artist, cover } = props;
	return (
		<div className={styles.songInfo}>
			{cover && <img src={cover} alt={title} className={styles.coverArt} />}
			<div>
				<div className={styles.songTitle}>{title}</div>
				<div className={styles.songArtist}>{artist}</div>
			</div>
		</div>
	)
}

export default SongInfo
