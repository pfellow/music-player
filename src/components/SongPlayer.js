import React, { useContext, useRef, useState, useEffect } from 'react';
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
import ReactPlayer from 'react-player';

export default function SongPlayer() {
  const { data } = useQuery(GET_QUEUED_SONGS);
  const reactPlayerRef = useRef();
  const { state, dispatch } = useContext(SongContext);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [positionInQueue, setPositionInQueue] = useState(0);

  useEffect(() => {
    const songIndex = data.queue.findIndex((song) => song.id === state.song.id);
    setPositionInQueue(songIndex);
  }, [state.song.id, data.queue]);

  useEffect(() => {
    const nextSong = data.queue[positionInQueue + 1];
    if (played >= 0.99 && nextSong) {
      dispatch({ type: 'SET_SONG', payload: { song: nextSong } });
      setPlayed(0);
    }
  }, [data.queue, played, positionInQueue, dispatch]);

  const togglePlayHander = () => {
    dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' });
  };

  const progressChangeHandler = (e, newValue) => {
    setPlayed(newValue);
  };

  const seekMouseDownHandler = () => {
    setSeeking(true);
  };

  const seekMouseUpHandler = () => {
    setSeeking(false);
    reactPlayerRef.current.seekTo(played);
  };

  const formatDuration = (seconds) => {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
  };

  const playPreviousHandler = () => {
    const prevSong = data.queue[positionInQueue - 1];
    if (played >= 0.01 || !prevSong) {
      reactPlayerRef.current.seekTo(0);
      setPlayed(0);
      return;
    }
    if (prevSong) {
      dispatch({ type: 'SET_SONG', payload: { song: prevSong } });
      setPlayed(0);
    }
  };

  const playNextHandler = () => {
    const nextSong = data.queue[positionInQueue + 1];
    if (nextSong) {
      dispatch({ type: 'SET_SONG', payload: { song: nextSong } });
      setPlayed(0);
    }
  };

  return (
    <>
      <Card
        variant='outlined'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '180px',
          maxWidth: '600px',
          mr: '10px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 15px',
            width: 'calc(100% - 200px)',
            minWidth: '200px'
          }}
        >
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant='h6' component='h3' noWrap>
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
            <IconButton onClick={playPreviousHandler}>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={togglePlayHander}>
              {state.isPlaying ? (
                <Pause sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrow sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton onClick={playNextHandler}>
              <SkipNext />
            </IconButton>
            <Typography variant='subtitle1' component='p' color='textSecondary'>
              {formatDuration(playedSeconds)}
            </Typography>
          </div>
          <Slider
            value={played}
            onChange={progressChangeHandler}
            onMouseDown={seekMouseDownHandler}
            onMouseUp={seekMouseUpHandler}
            type='range'
            min={0}
            max={1}
            step={0.01}
            size='small'
          />
        </div>
        <ReactPlayer
          ref={reactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
          url={state.song.url}
          playing={state.isPlaying}
          hidden
        />
        <CardMedia image={state.song.thumbnail} sx={{ width: 200 }} />
      </Card>
      <QueuedSongList queue={data.queue} />
    </>
  );
}
