import { useMutation } from '@apollo/client';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Avatar, Typography, IconButton, useMediaQuery } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';
import { SongContext } from '../App';

export default function QueuedSongList({ queue }) {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const QueuedSong = ({ song }) => {
    const { state, dispatch } = useContext(SongContext);
    const [currentSongPlaying, setCurrentSongPlaying] = useState(false);

    useEffect(() => {
      const isSongPlaying = state.isPlaying && song.id === state.song.id;
      if (isSongPlaying) {
        setCurrentSongPlaying(true);
      }
    }, [state, song]);

    const togglePlayHander = () => {
      if (currentSongPlaying) {
        dispatch({ type: 'PAUSE_SONG' });
      } else if (song.id === state.song.id) {
        dispatch({ type: 'PLAY_SONG' });
      } else {
        dispatch({ type: 'SET_SONG', payload: { song } });
      }
    };
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
      onCompleted: (data) =>
        localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
    });

    const addOrRemoveFromQueueHandler = () => {
      addOrRemoveFromQueue({
        variables: {
          input: { ...song, __typename: 'Song' }
        }
      });
    };
    return (
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateColumns: '50px auto 100px',
          gridGap: 12,
          alignItems: 'center',
          marginTop: 10,
          maxWidth: '600px'
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
        <div style={{ display: 'flex' }}>
          <IconButton onClick={togglePlayHander}>
            {currentSongPlaying ? (
              <Pause sx={{ height: 30, width: 30 }} />
            ) : (
              <PlayArrow sx={{ height: 30, width: 30 }} />
            )}
          </IconButton>
          <IconButton onClick={addOrRemoveFromQueueHandler}>
            <Delete sx={{ color: '#802922' }} />
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    greaterThanMd && (
      <div style={{ margin: '10px 0' }}>
        <Typography color='textSecondary' variant='button'>
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
}
