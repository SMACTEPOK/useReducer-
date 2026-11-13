export const MUSIC_ACTIONS = { PLAY: 'PLAY', PAUSE: 'PAUSE', NEXT: 'NEXT', PREV: 'PREV', SET_PROGRESS: 'SET_PROGRESS', SET_VOLUME: 'SET_VOLUME', TOGGLE_REPEAT: 'TOGGLE_REPEAT', TOGGLE_SHUFFLE: 'TOGGLE_SHUFFLE', SELECT_TRACK: 'SELECT_TRACK' };

const TRACKS = [
  { id: 1, title: 'Neon Nights', artist: 'SynthWave', duration: 180 },
  { id: 2, title: 'Brutalist Beats', artist: 'Concrete', duration: 240 },
  { id: 3, title: 'Cyber Dawn', artist: 'Glitch', duration: 200 }
];

export const initialMusicState = { tracks: TRACKS, currentTrackIndex: 0, isPlaying: false, progress: 0, volume: 50, repeat: false, shuffle: false };

export function musicReducer(state, action) {
  switch (action.type) {
    case MUSIC_ACTIONS.PLAY: return { ...state, isPlaying: true };
    case MUSIC_ACTIONS.PAUSE: return { ...state, isPlaying: false };
    case MUSIC_ACTIONS.SELECT_TRACK: return { ...state, currentTrackIndex: action.payload, progress: 0, isPlaying: true };
    case MUSIC_ACTIONS.NEXT: {
      const nextIndex = (state.currentTrackIndex + 1) % state.tracks.length;
      return { ...state, currentTrackIndex: nextIndex, progress: 0, isPlaying: true };
    }
    case MUSIC_ACTIONS.PREV: {
      const prevIndex = (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length;
      return { ...state, currentTrackIndex: prevIndex, progress: 0, isPlaying: true };
    }
    case MUSIC_ACTIONS.SET_PROGRESS: return { ...state, progress: action.payload };
    case MUSIC_ACTIONS.SET_VOLUME: return { ...state, volume: action.payload };
    case MUSIC_ACTIONS.TOGGLE_REPEAT: return { ...state, repeat: !state.repeat };
    case MUSIC_ACTIONS.TOGGLE_SHUFFLE: return { ...state, shuffle: !state.shuffle };
    default: return state;
  }
}
