import React, { useContext, useState, useEffect, useRef } from 'react';
import FullPlayer from './FullPlayer';
import MiniPlayer from './MiniPlayer';
import { SongContext } from '../../App';
import { useQuery } from '@apollo/client';
import { GET_QUEUED_SONGS } from '../../graphql/queries';
import ReactPlayer from 'react-player';

export default function SongPlayer() {
  const { data } = useQuery(GET_QUEUED_SONGS);
  const reactPlayerRef = useRef();

  const { state, dispatch } = useContext(SongContext);
  const [played, setPlayed] = useState(0);
  const [positionInQueue, setPositionInQueue] = useState(0);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  useEffect(() => {
    const songIndex = data.queue.findIndex((song) => song.id === state.song.id);
    setPositionInQueue(songIndex);
  }, [state.song.id, data.queue]);

  useEffect(() => {
    const nextSong = data.queue[positionInQueue + 1];
    if (played >= 0.99 && nextSong) {
      dispatch({ type: 'SET_SONG', payload: { song: nextSong } });
      setPlayed(0);
    }
  }, [data.queue, played, positionInQueue, dispatch]);

  return (
    <>
      {isMiniPlayer ? (
        <MiniPlayer
          played={played}
          setPlayed={setPlayed}
          reactPlayerRef={reactPlayerRef}
          data={data}
          positionInQueue={positionInQueue}
          setIsMiniPlayer={setIsMiniPlayer}
        />
      ) : (
        <FullPlayer
          setIsMiniPlayer={setIsMiniPlayer}
          data={data}
          played={played}
          setPlayed={setPlayed}
          playedSeconds={playedSeconds}
          setSeeking={setSeeking}
          reactPlayerRef={reactPlayerRef}
          setPlayedSeconds={setPlayedSeconds}
          positionInQueue={positionInQueue}
          seeking={seeking}
        />
      )}
      <ReactPlayer
        ref={reactPlayerRef}
        onProgress={({ played, playedSeconds }) => {
          if (!seeking) {
            setPlayed(played);
            setPlayedSeconds(playedSeconds);
          }
        }}
        url={state.song.url}
        playing={state.isPlaying}
        hidden
        onReady={() => {
          dispatch({ type: 'INITIATE' });
        }}
      />
    </>
  );
}
