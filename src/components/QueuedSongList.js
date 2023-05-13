import { useMutation } from '@apollo/client';
import { Delete } from '@mui/icons-material';
import { Avatar, Typography, IconButton, useMediaQuery } from '@mui/material';
import React from 'react';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

export default function QueuedSongList({ queue }) {
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const QueuedSong = ({ song }) => {
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
          gridTemplateColumns: '50px auto 50px',
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
        <IconButton onClick={addOrRemoveFromQueueHandler}>
          <Delete color='error' />
        </IconButton>
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
