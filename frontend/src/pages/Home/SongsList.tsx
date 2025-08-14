// import React from 'react'

import SongItem from './SongItem'

import type { SongListItem } from '../../Types/SongListItem'

interface SongsListProps {
  data? : SongListItem[] | undefined;
}

const SongsList = ({ data }: SongsListProps) => {
  return (
    <div>
      {data && data.map((song, index) => (
        <SongItem key={index} {...song} />
      ))}
    </div>
  )
}

export default SongsList
