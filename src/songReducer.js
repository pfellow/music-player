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
        ...state,
        song: action.payload.song
      };
    case 'INITIATE':
      if (!state.initiated) {
        return {
          ...state,
          initiated: true
        };
      } else {
        return {
          ...state,
          isPlaying: true
        };
      }
    default:
      return state;
  }
};
