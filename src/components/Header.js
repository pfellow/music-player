import { HeadsetTwoTone } from '@mui/icons-material';
import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function Header() {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <HeadsetTwoTone />
        <Typography sx={{ ml: 2 }} variant='h6' component='h1'>
          React Youtube and Soundcloud Music Player
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
