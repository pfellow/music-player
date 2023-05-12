import { AddBoxOutlined, Link } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import styles from './AddSong.module.css';
import ReactPlayer from 'react-player';
import SoundCloudPlayer from 'react-player/soundcloud';
import YouTubePlayer from 'react-player/youtube';
import { ADD_SONG } from '../graphql/mutations';

const DEFAULT_SONG = {
  duration: 0,
  title: '',
  artist: '',
  thumbnail: ''
};

export default function AddSong() {
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [url, setUrl] = useState('');
  const [dialog, setDialog] = useState(false);
  const [playable, setPlayable] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG);

  useEffect(() => {
    const isPlayable =
      SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const changeSongHandler = (e) => {
    const { name, value } = e.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value
    }));
  };

  const handleEditSong = async ({ player }) => {
    console.log('handleEditSong');
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  };

  const addSongHandler = async () => {
    const { url, thumbnail, duration, title, artist } = song;
    try {
      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null
        }
      });
    } catch (error) {
      console.error('Error adding song', song);
      return;
    }
    handleCloseDialog();
    setSong(DEFAULT_SONG);
    setUrl('');
  };

  const getYoutubeInfo = (player) => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;

    return {
      duration,
      title,
      artist: author,
      thumbnail
    };
  };

  const getSoundCloudInfo = (player) => {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500')
          });
        }
      });
    });
  };

  const handleError = (field) => {
    return error?.graphQLErrors[0]?.extensions?.path?.includes(field);
  };

  const { thumbnail, title, artist } = song;

  return (
    <div className={styles.container}>
      <Dialog
        open={dialog}
        onClose={handleCloseDialog}
        className={styles.dialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src={thumbnail}
            alt='Song Thumbnail'
            className={styles.thumbnail}
          />
          <TextField
            value={title}
            onChange={changeSongHandler}
            variant='standard'
            margin='dense'
            name='title'
            label='Title'
            fullWidth
            error={handleError('title')}
            helperText={handleError('title') && 'The field should not be empty'}
          />
          <TextField
            value={artist}
            onChange={changeSongHandler}
            variant='standard'
            margin='dense'
            name='artist'
            label='Artist'
            fullWidth
            error={handleError('artist')}
            helperText={
              handleError('artist') && 'The field should not be empty'
            }
          />
          <TextField
            value={thumbnail}
            onChange={changeSongHandler}
            margin='dense'
            variant='standard'
            name='thumbnail'
            label='Thumbnail'
            fullWidth
            error={handleError('thumbnail')}
            helperText={
              handleError('thumbnail') && 'The field should not be empty'
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            Cancel
          </Button>
          <Button color='primary' variant='outlined' onClick={addSongHandler}>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        sx={{
          margin: 1
        }}
        variant='standard'
        placeholder='Add Youtube or Soundcloud Url'
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        fullWidth
        type='url'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Link />
            </InputAdornment>
          )
        }}
      />
      <Button
        disabled={!playable}
        variant='contained'
        color='primary'
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(true)}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
}
