import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer/SongPlayer';
import QueuedSongList from './components/QueuedSongList';
import { Hidden } from '@mui/material';
import { createContext, useReducer, useContext, useEffect } from 'react';
import { songReducer } from './songReducer';
import { useQuery } from '@apollo/client';
import { GET_QUEUED_SONGS, GET_SONGS } from './graphql/queries';

export const SongContext = createContext({
  song: {
    id: '',
    title: '',
    artist: '',
    thumbnail: '',
    duration: 0,
    url: ''
  },
  isPlaying: false,
  initiated: false
});

function App() {
  const { data: savedSongs, loading } = useQuery(GET_SONGS);
  const { data: queueData } = useQuery(GET_QUEUED_SONGS);
  let initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);

  useEffect(() => {
    if (queueData.queue[0]) {
      dispatch({ type: 'SET_SONG', payload: { song: queueData.queue[0] } });
    }
  }, [queueData]);

  useEffect(() => {
    if (!loading && state.song.id === '') {
      if (savedSongs?.songs[0]) {
        dispatch({
          type: 'SET_SONG',
          payload: { song: savedSongs.songs[0] }
        });
      }
    }
  }, [savedSongs, loading, state.song]);

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
              : { position: 'fixed', width: '100%', left: 0, bottom: 10 }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
          <QueuedSongList queue={queueData.queue} />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
