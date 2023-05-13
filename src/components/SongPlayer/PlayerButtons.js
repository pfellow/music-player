import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useContext } from 'react';
import { SongContext } from '../../App';

const PlayerButtons = ({
  played,
  setPlayed,
  data,
  positionInQueue,
  reactPlayerRef
}) => {
  const { state, dispatch } = useContext(SongContext);

  const togglePlayHander = () => {
    dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' });
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
    <Box>
      <IconButton onClick={playPreviousHandler}>
        <SkipPrevious sx={{ color: '#004040' }} />
      </IconButton>
      <IconButton onClick={togglePlayHander}>
        {state.isPlaying ? (
          <Pause sx={{ height: 38, width: 38, color: '#004040' }} />
        ) : (
          <PlayArrow sx={{ height: 38, width: 38, color: '#004040' }} />
        )}
      </IconButton>
      <IconButton onClick={playNextHandler}>
        <SkipNext sx={{ color: '#004040' }} />
      </IconButton>
    </Box>
  );
};

export default PlayerButtons;
