import { Card, IconButton } from '@mui/material';
import { ZoomOutMapOutlined } from '@mui/icons-material';
import PlayerButtons from './PlayerButtons';
const MiniPlayer = ({
  setIsMiniPlayer,
  played,
  setPlayed,
  reactPlayerRef,
  data,
  positionInQueue
}) => {
  const togglePlayerHandler = () => {
    setIsMiniPlayer((currentIsMiniPlayer) => !currentIsMiniPlayer);
  };
  return (
    <Card
      variant='outlined'
      sx={{
        display: 'flex',
        padding: '2px 7px',
        position: 'fixed',
        left: 0,
        bottom: 0
      }}
    >
      <PlayerButtons
        played={played}
        setPlayed={setPlayed}
        reactPlayerRef={reactPlayerRef}
        data={data}
        positionInQueue={positionInQueue}
      />
      <IconButton onClick={togglePlayerHandler}>
        <ZoomOutMapOutlined />
      </IconButton>
    </Card>
  );
};

export default MiniPlayer;
