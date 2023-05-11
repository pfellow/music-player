import { HeadsetTwoTone } from '@mui/icons-material';
import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function Header() {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <HeadsetTwoTone />
        <Typography sx={{ ml: 2 }} variant='h6' component='h1'>
          Apollo Music Share and Player
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
