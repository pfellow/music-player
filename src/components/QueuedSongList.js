import { Delete } from '@mui/icons-material';
import { Avatar, Typography, IconButton, useMediaQuery } from '@mui/material';
import React from 'react';

const song = {
  title: '7 rings',
  artist: 'Ariana Grande',
  thumbnail:
    'https://nzmcd.co.nz/wp-content/uploads/2023/04/Te-Pae-300x225.jpg.webp'
};

export default function QueuedSongList() {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const QueuedSong = ({ song }) => {
    return (
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateColumns: '50px auto 50px',
          gridGap: 12,
          alignItems: 'center',
          marginTop: 10
        }}
      >
        <Avatar
          src={song.thumbnail}
          alt='Song thumbnail'
          sx={{ width: 44, height: 44 }}
        />
        <div style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
          <Typography
            variant='subtitle2'
            sx={{ overFlow: 'hidden', witeSpace: 'nowrap' }}
          >
            {song.title}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            sx={{ overFlow: 'hidden', witeSpace: 'nowrap' }}
          >
            {song.artist}
          </Typography>
        </div>
        <IconButton>
          <Delete color='error' />
        </IconButton>
      </div>
    );
  };

  return (
    greaterThanMd && (
      <div style={{ margin: '10px 0' }}>
        <Typography color='textSecondary' variant='button'>
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
}
