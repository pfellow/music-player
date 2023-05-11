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
import React, { useState } from 'react';
import styles from './AddSong.module.css';

export default function AddSong() {
  const [dialog, setDialog] = useState(false);

  const handleCloseDialog = () => {
    setDialog(false);
  };

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
            src='https://nzmcd.co.nz/wp-content/uploads/2023/04/Te-Pae-300x225.jpg.webp'
            alt='Song Thumbnail'
            className={styles.thumbnail}
          />
          <TextField
            variant='standard'
            margin='dense'
            name='title'
            label='Title'
            fullWidth
          />
          <TextField
            variant='standard'
            margin='dense'
            name='artist'
            label='Artist'
            fullWidth
          />
          <TextField
            margin='dense'
            variant='standard'
            name='thumbnail'
            label='Thumbnail'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            Cancel
          </Button>
          <Button color='primary' variant='outlined'>
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
        variant='contained'
        color='primary'
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(true)}
      >
        Add
      </Button>
    </div>
  );
}
