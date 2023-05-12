import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Hidden } from '@mui/material';
import { createContext, useReducer, useContext } from 'react';
import { songReducer } from './songReducer';

export const SongContext = createContext({
  song: {
    id: '1878636e-3501-470a-b1dc-14014e892d72',
    title: 'Muddy Feet',
    artist: 'Miley Cyrus ft. Sia',
    thumbnail: 'http://img.youtube.com/vi/mpl4iNPn7QY/0.jpg',
    duration: 137,
    url: 'https://www.youtube.com/watch?v=mpl4iNPn7QY'
  },
  isPlaying: false
});

function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only='xs'>
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{ paddingTop: greaterThanSm ? 100 : 30 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ? {
                  position: 'fixed',
                  width: '100%',
                  right: 0,
                  top: 70
                }
              : { position: 'fixed', width: '100%', left: 0, bottom: 0 }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
