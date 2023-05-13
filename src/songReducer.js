export const songReducer = (state, action) => {
  switch (action.type) {
    case 'PLAY_SONG':
      return {
        ...state,
        isPlaying: true
      };
    case 'PAUSE_SONG':
      return {
        ...state,
        isPlaying: false
      };
    case 'SET_SONG':
      return {
        song: action.payload.song,
        isPlaying: false
      };
    default:
      return state;
  }
};
