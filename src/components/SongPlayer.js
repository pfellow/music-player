import React from 'react';
import QueuedSongList from './QueuedSongList';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Typography
} from '@mui/material';
import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';

export default function SongPlayer() {
  return (
    <>
      <Card
        variant='outlined'
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 15px'
          }}
        >
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant='h5' component='h3'>
              Title
            </Typography>
            <Typography variant='subtitle1' component='p' color='textSecondary'>
              Artist
            </Typography>
          </CardContent>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 1,
              paddingRight: 1
            }}
          >
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant='subtitle1' component='p' color='textSecondary'>
              00:01:30
            </Typography>
          </div>
          <Slider type='range' min={0} max={1} step={0.01} size='small' />
        </div>
        <CardMedia
          image='https://nzmcd.co.nz/wp-content/uploads/2023/04/Te-Pae-300x225.jpg.webp'
          sx={{ width: 150 }}
        />
      </Card>
      <QueuedSongList />
    </>
  );
}
