import React, { useContext } from 'react';
import QueuedSongList from './QueuedSongList';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Typography
} from '@mui/material';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { SongContext } from '../App';
import { useQuery } from '@apollo/client';
import { GET_QUEUED_SONGS } from '../graphql/queries';

export default function SongPlayer() {
  const { data } = useQuery(GET_QUEUED_SONGS);
  const { state, dispatch } = useContext(SongContext);

  const togglePlayHander = () => {
    dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' });
  };

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
              {state.song.title}
            </Typography>
            <Typography variant='subtitle1' component='p' color='textSecondary'>
              {state.song.artist}
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
            <IconButton onClick={togglePlayHander}>
              {state.isPlaying ? (
                <Pause sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrow sx={{ height: 38, width: 38 }} />
              )}
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
        <CardMedia image={state.song.thumbnail} sx={{ width: 150 }} />
      </Card>
      <QueuedSongList queue={data.queue} />
    </>
  );
}
