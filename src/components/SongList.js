import { useMutation, useSubscription } from '@apollo/client';
import { Pause, PlayArrow, Save } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { GET_SONGS } from '../graphql/subscriptions';
import { SongContext } from '../App';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

export default function SongList() {
  const { data, loading, error } = useSubscription(GET_SONGS);

  const Song = ({ song }) => {
    const { id } = song;
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
      onCompleted: (data) =>
        localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
    });
    const { state, dispatch } = useContext(SongContext);
    const [currentSongPlaying, setCurrentSongPlaying] = useState(false);

    useEffect(() => {
      const isSongPlaying = state.isPlaying && id === state.song.id;
      if (isSongPlaying) {
        setCurrentSongPlaying(true);
      }
    }, [id, state.song.id, state.isPlaying]);

    const togglePlayHander = () => {
      dispatch({ type: 'SET_SONG', payload: { song } });
      dispatch(
        state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' }
      );
    };

    const addOrRemoveFromQueueHandler = () => {
      addOrRemoveFromQueue({
        variables: {
          input: { ...song, __typename: 'Song' }
        }
      });
    };

    return (
      <Card sx={{ margin: 2 }}>
        <div
          style={{
            display: 'flex'
          }}
        >
          <CardMedia
            image={song.thumbnail}
            sx={{ objectFit: 'cover', width: 140 }}
          />
          <div
            style={{
              width: 'calc(100% - 140px)',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <CardContent sx={{ width: 'calc(100% - 125px)' }}>
              <Typography gutterBottom variant='h6' component='h3' noWrap>
                {song.title}
              </Typography>
              <Typography variant='body1' component='p' color='textSecondary'>
                {song.artist}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                size='small'
                color='primary'
                onClick={togglePlayHander}
              >
                {currentSongPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton
                size='small'
                color='secondary'
                onClick={addOrRemoveFromQueueHandler}
              >
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
  if (error) return <div>Error fetching songs</div>;

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}
