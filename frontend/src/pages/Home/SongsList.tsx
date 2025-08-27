// import React from 'react'

import SongCard from '../../components/SongCard/SongCard'

import type { SongListItem } from '../../Types/SongListItem'

import styles from "./SongsList.module.css"

interface SongsListProps {
  data? : SongListItem[] | undefined;
}

const SongsList = ({ data }: SongsListProps) => {
  return (
    <div className={styles.SongsList}>
      {data && data.map((song, index) => (
        <SongCard key={index} {...song} />
      ))}
    </div>
  )
}

export default SongsList
