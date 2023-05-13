import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Typography
} from '@mui/material';
import { ZoomInMapOutlined } from '@mui/icons-material';
import { SongContext } from '../../App';
import PlayerButtons from './PlayerButtons';

const FullPlayer = ({
  data,
  played,
  setPlayed,
  setIsMiniPlayer,
  playedSeconds,
  setPlayedSeconds,
  setSeeking,
  reactPlayerRef,
  positionInQueue,
  seeking
}) => {
  const { state } = useContext(SongContext);

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

  const togglePlayerHandler = () => {
    setIsMiniPlayer((currentIsMiniPlayer) => !currentIsMiniPlayer);
  };

  return (
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6' component='h3' noWrap color='#004040'>
              {state.song.title}
            </Typography>
            <IconButton onClick={togglePlayerHandler}>
              <ZoomInMapOutlined />
            </IconButton>
          </Box>
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
          <PlayerButtons
            played={played}
            setPlayed={setPlayed}
            reactPlayerRef={reactPlayerRef}
            data={data}
            positionInQueue={positionInQueue}
            seeking={seeking}
            setPlayedSeconds={setPlayedSeconds}
          />
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
      <CardMedia image={state.song.thumbnail} sx={{ width: 200 }} />
    </Card>
  );
};

export default FullPlayer;
