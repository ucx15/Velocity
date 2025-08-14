// import React from 'react'

import { useNavigate } from 'react-router-dom';


import type { SongListItem } from '../../Types/SongListItem';


const SongItem = ({_id, title, artist, duration }: SongListItem) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/song/${_id}`);
	}

	return (
		<div onClick={handleClick}>
			<h2>{title}</h2>
			<p>{artist}</p>
			<p>{duration}s</p>
		</div>
	)
}

export default SongItem
