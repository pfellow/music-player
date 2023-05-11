import { PlayArrow, Save } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography
} from '@mui/material';
import React from 'react';

export default function SongList() {
  let loading = false;

  const song = {
    title: '7 rings',
    artist: 'Ariana Grande',
    thumbnail:
      'https://nzmcd.co.nz/wp-content/uploads/2023/04/Te-Pae-300x225.jpg.webp'
  };

  const Song = ({ song }) => {
    return (
      <Card sx={{ margin: 2 }}>
        <div
          style={{
            display: 'flex'
          }}
        >
          <CardMedia
            image={song.thumbnail}
            sx={{ objectFit: 'cover', width: 140, height: 100 }}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {song.title}
              </Typography>
              <Typography variant='body1' component='p' color='textSecondary'>
                {song.artist}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton size='small' color='primary'>
                <PlayArrow />
              </IconButton>
              <IconButton size='small' color='secondary'>
                <Save />
              </IconButton>
            </CardActions>
          </div>
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      {Array.from({ length: 10 }, () => song).map((song, i) => (
        <Song key={i} song={song} />
      ))}
    </div>
  );
}
